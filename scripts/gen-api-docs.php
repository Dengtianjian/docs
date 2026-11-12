<?php
/**
 * 从 gstudio_kernel 源码生成「一个类一篇」的 API 文档
 *
 * 用法：php scripts/gen-api-docs.php
 * 输出：docs/php/api/<源码目录层级>/<类名 kebab>.md
 * 侧边栏由 .vitepress/config.ts 在构建时扫描该目录自动生成
 *
 * 解析方式是静态的（token_get_all），不加载类——避免历史坏引用影响生成。
 */

$kernelRoot = dirname(__DIR__, 2) . "/gstudio_kernel";
$outRoot    = __DIR__ . "/../docs/php/api";

// ============================ 工具 ============================

function kebab(string $name): string
{
  $s = preg_replace('/([a-z0-9])([A-Z])/', '$1-$2', $name);
  $s = preg_replace('/([A-Z]+)([A-Z][a-z])/', '$1-$2', $s);
  return strtolower($s);
}

function docLines(string $doc): array
{
  $out = [];
  foreach (explode("\n", $doc) as $line) {
    $line = trim($line);
    $line = preg_replace('/^\/\*\*?/', "", $line);
    $line = preg_replace('/\*\/$/', "", $line);
    $line = trim(preg_replace('/^\*/', "", $line));
    $out[] = $line;
  }
  return $out;
}

/** 首段（不跨空行）作为摘要 */
function summary(string $doc): string
{
  if (trim($doc) === "") return "";
  $buf = [];
  foreach (docLines($doc) as $l) {
    if ($l === "") { if ($buf) break; else continue; }
    if (strpos($l, "@") === 0) break;
    $buf[] = $l;
  }
  return trim(implode(" ", $buf));
}

/** 摘要之后的正文（保留空行分段与代码块） */
function bodyText(string $doc): string
{
  if (trim($doc) === "") return "";
  $paras = [];
  $cur = [];
  foreach (docLines($doc) as $l) {
    if (strpos($l, "@") === 0) break;
    if ($l === "") {
      if ($cur) { $paras[] = trim(implode("\n", $cur)); $cur = []; }
      continue;
    }
    $cur[] = $l;
  }
  if ($cur) $paras[] = trim(implode("\n", $cur));
  array_shift($paras);
  return trim(implode("\n\n", $paras));
}

/** 收集整段 docblock 里的示例代码块（``` 包裹或缩进形式） */
function examples(string $doc): array
{
  $text = implode("\n", docLines($doc));
  $out = [];
  if (preg_match_all('/```[a-zA-Z]*\n(.*?)```/s', $text, $m)) {
    foreach ($m[1] as $code) {
      $out[] = rtrim($code);
    }
  }
  return $out;
}

function docTags(string $doc): array
{
  $tags = [];
  foreach (docLines($doc) as $l) {
    if (preg_match('/^@(\w+)\s*(.*)$/', $l, $m)) {
      $tags[strtolower($m[1])][] = trim($m[2]);
    }
  }
  return $tags;
}

function isNameToken($t): bool
{
  return is_array($t) && in_array($t[0], [
    T_STRING, T_NS_SEPARATOR,
    defined('T_NAME_QUALIFIED') ? T_NAME_QUALIFIED : T_STRING,
    defined('T_NAME_FULLY_QUALIFIED') ? T_NAME_FULLY_QUALIFIED : T_STRING,
    defined('T_NAME_RELATIVE') ? T_NAME_RELATIVE : T_STRING,
  ], true);
}

function normType(string $type): string
{
  $type = trim(preg_replace('/\s+/', " ", $type));
  return $type === "" ? "mixed" : $type;
}

// ============================ 解析 ============================

function parseFile(string $file): ?array
{
  $src = file_get_contents($file);
  $tokens = @token_get_all($src);
  if (!$tokens) return null;

  $namespace = "";
  $classDoc = "";
  $doc = "";
  $className = null;
  $kind = null;
  $extends = null;
  $implements = [];
  $methods = [];
  $constants = [];
  $properties = [];
  $uses = [];
  $count = count($tokens);

  $inClass = false;
  $depth = 0;

  for ($i = 0; $i < $count; $i++) {
    $t = $tokens[$i];

    if (is_array($t) && $t[0] === T_DOC_COMMENT) { $doc = $t[1]; continue; }
    if (is_array($t) && in_array($t[0], [T_COMMENT, T_WHITESPACE], true)) continue;

    // ---- 命名空间 ----
    if (!$inClass && is_array($t) && $t[0] === T_NAMESPACE) {
      $ns = "";
      for ($j = $i + 1; $j < $count; $j++) {
        $nt = $tokens[$j];
        if (is_array($nt) && in_array($nt[0], [T_WHITESPACE, T_COMMENT, T_DOC_COMMENT], true)) continue;
        if ((is_array($nt) && $nt[1] === ";") || $nt === ";") break;
        if (isNameToken($nt)) $ns .= $nt[1];
      }
      $namespace = trim($ns, "\\");
      $doc = "";
      continue;
    }

    // ---- use 导入 ----
    if (!$inClass && is_array($t) && $t[0] === T_USE) {
      $buf = "";
      for ($j = $i + 1; $j < $count; $j++) {
        $jt = $tokens[$j];
        $js = is_array($jt) ? $jt[1] : $jt;
        if ($js === ";") { $i = $j; break; }
        $buf .= $js;
      }
      $buf = trim(preg_replace('/\s+/', " ", $buf));
      if ($buf !== "" && $buf[0] !== "(") {
        foreach (explode(",", $buf) as $one) {
          $one = trim($one);
          if ($one === "") continue;
          if (preg_match('/^(.+?)\s+as\s+(\w+)$/i', $one, $um)) {
            $uses[strtolower($um[2])] = ltrim(trim($um[1]), "\\");
          } else {
            $short = substr($one, strrpos("\\" . $one, "\\"));
            $uses[strtolower(ltrim($short, "\\"))] = ltrim($one, "\\");
          }
        }
      }
      $doc = "";
      continue;
    }

    // ---- 类声明 ----
    if (!$inClass && is_array($t) && in_array($t[0], [T_CLASS, T_INTERFACE, T_TRAIT], true)) {
      $prev = $i - 1;
      while ($prev >= 0 && is_array($tokens[$prev]) && $tokens[$prev][0] === T_WHITESPACE) $prev--;
      if ($prev >= 0 && is_array($tokens[$prev]) && in_array($tokens[$prev][0], [T_DOUBLE_COLON, T_NEW], true)) {
        $doc = "";
        continue;
      }

      $kind = $t[0] === T_CLASS ? "class" : ($t[0] === T_INTERFACE ? "interface" : "trait");

      for ($j = $i + 1; $j < $count; $j++) {
        if (is_array($tokens[$j]) && $tokens[$j][0] === T_WHITESPACE) continue;
        if (is_array($tokens[$j]) && $tokens[$j][0] === T_STRING) { $className = $tokens[$j][1]; $i = $j; }
        break;
      }
      if (!$className) { $doc = ""; continue; }
      $classDoc = $doc;

      for ($j = $i + 1; $j < $count; $j++) {
        $jt = $tokens[$j];
        $js = is_array($jt) ? $jt[1] : $jt;
        if ($js === "{") { $i = $j; break; }
        if (is_array($jt) && $jt[0] === T_EXTENDS) {
          $buf = "";
          for ($k = $j + 1; $k < $count; $k++) {
            $kt = $tokens[$k];
            $ks = is_array($kt) ? $kt[1] : $kt;
            if ($ks === "{" || (is_array($kt) && $kt[0] === T_IMPLEMENTS)) { $j = $k - 1; break; }
            $buf .= $ks;
          }
          $extends = trim(preg_replace('/\s+/', " ", $buf));
        }
        if (is_array($jt) && $jt[0] === T_IMPLEMENTS) {
          $buf = "";
          for ($k = $j + 1; $k < $count; $k++) {
            $kt = $tokens[$k];
            $ks = is_array($kt) ? $kt[1] : $kt;
            if ($ks === "{") { $j = $k - 1; break; }
            $buf .= $ks;
          }
          $implements = array_values(array_filter(array_map("trim", explode(",", preg_replace('/\s+/', " ", $buf)))));
        }
      }

      $inClass = true;
      $depth = 1;
      $doc = "";
      continue;
    }

    if (!$inClass) continue;

    // ---- 类体 ----
    if ($t === "{" || (is_array($t) && ($t[1] ?? null) === "{")) { $depth++; $doc = ""; continue; }
    if ($t === "}" || (is_array($t) && ($t[1] ?? null) === "}")) {
      $depth--;
      if ($depth === 0) $inClass = false;
      $doc = "";
      continue;
    }

    if ($depth !== 1) continue;

    // 常量
    if (is_array($t) && $t[0] === T_CONST) {
      $buf = "";
      for ($j = $i + 1; $j < $count; $j++) {
        $jt = $tokens[$j];
        $js = is_array($jt) ? $jt[1] : $jt;
        if ($js === ";") { $i = $j; break; }
        $buf .= $js;
      }
      $raw = trim(preg_replace('/\s+/', " ", $buf));
      if (preg_match('/^([\w]+)\s*(?:=\s*(.*))?$/', $raw, $cm)) {
        $constants[] = ["name" => $cm[1], "value" => trim($cm[2] ?? ""), "doc" => $doc];
      } else {
        $constants[] = ["name" => $raw, "value" => "", "doc" => $doc];
      }
      $doc = "";
      continue;
    }

    // 方法
    if (is_array($t) && $t[0] === T_FUNCTION) {
      $method = parseMethod($tokens, $i, $count);
      if ($method) {
        $method["doc"] = $doc;
        $methods[] = $method;
      }
      $doc = "";
      continue;
    }

    // 属性：修饰符 / 类型 / 变量 起头，直到 ';'
    if (is_array($t) && (
      in_array($t[0], [T_PUBLIC, T_PRIVATE, T_PROTECTED, T_STATIC, T_VAR, T_READONLY], true)
      || isNameToken($t)
      || $t[0] === T_ARRAY
    )) {
      // 先确认是属性而不是方法：向前找 ';' / '(' / '{' / '}'，遇到 '(' 说明是方法签名
      $isMethod = false;
      for ($k = $i; $k < $count; $k++) {
        $ks = is_array($tokens[$k]) ? ($tokens[$k][1] ?? "") : $tokens[$k];
        if ($ks === ";" || $ks === "{" || $ks === "}" || $ks === "=") break;
        if ($ks === "(") { $isMethod = true; break; }
      }
      if ($isMethod) continue;   // 交给 T_FUNCTION 分支，别清 doc

      $buf = "";
      $end = false;
      for ($j = $i; $j < $count; $j++) {
        $jt = $tokens[$j];
        $js = is_array($jt) ? $jt[1] : $jt;
        if ($js === "{" || $js === "}") break;
        $buf .= $js;
        if ($js === ";") { $end = true; $i = $j; break; }
      }
      if ($end) {
        $raw = trim(preg_replace('/\s+/', " ", $buf));
        if (strpos($raw, "$") !== false && strpos($raw, "function") === false) {
          $prop = parseProperty($raw);
          if ($prop) {
            $prop["doc"] = $doc;
            if ($prop["type"] === "") {
              foreach (docTags($doc)["var"] ?? [] as $v) {
                if (preg_match('/^([\w\\\\|?\[\]]+)/', trim($v), $vm)) { $prop["type"] = $vm[1]; break; }
              }
            }
            $properties[] = $prop;
          }
        }
        $doc = "";
        continue;
      }
    }

    // 其它 token：保留 doc（修饰符仍需挂给后面的成员）
    $doc = "";
  }

  if (!$className) return null;

  return [
    "namespace" => $namespace,
    "class" => $className,
    "fqcn" => ($namespace !== "" ? $namespace . "\\" : "") . $className,
    "kind" => $kind ?: "class",
    "extends" => $extends,
    "implements" => $implements,
    "doc" => $classDoc,
    "methods" => $methods,
    "constants" => $constants,
    "properties" => $properties,
    "uses" => $uses,
    "file" => $file,
  ];
}

function parseProperty(string $raw): ?array
{
  $raw = rtrim($raw, ";");
  if (!preg_match('/^(?:((?:public|protected|private|static|readonly|var)\s+)*)?([\w\\\\|?\[\]]+)?\s*(\$[\w]+)\s*(?:=\s*(.*))?$/s', $raw, $m)) {
    return null;
  }
  $mods = trim($m[1] ?? "");
  $type = trim($m[2] ?? "");
  $name = $m[3];
  $default = trim($m[4] ?? "");

  $visibility = "public";
  if (strpos($mods, "private") !== false) $visibility = "private";
  elseif (strpos($mods, "protected") !== false) $visibility = "protected";

  return [
    "name" => $name,
    "type" => $type,
    "default" => $default,
    "visibility" => $visibility,
    "static" => strpos($mods, "static") !== false,
  ];
}

function parseMethod(array $tokens, int &$i, int $count): ?array
{
  $visibility = "public";
  $static = false;
  $abstract = false;
  $name = null;

  for ($j = $i - 1; $j >= 0; $j--) {
    $t = $tokens[$j];
    if (is_array($t) && in_array($t[0], [T_WHITESPACE, T_DOC_COMMENT, T_COMMENT], true)) continue;
    if (is_array($t) && $t[0] === T_STATIC) { $static = true; continue; }
    if (is_array($t) && $t[0] === T_ABSTRACT) { $abstract = true; continue; }
    if (is_array($t) && $t[0] === T_PRIVATE) { $visibility = "private"; continue; }
    if (is_array($t) && $t[0] === T_PROTECTED) { $visibility = "protected"; continue; }
    if (is_array($t) && $t[0] === T_PUBLIC) { $visibility = "public"; continue; }
    break;
  }

  for ($j = $i + 1; $j < $count; $j++) {
    if (is_array($tokens[$j]) && $tokens[$j][0] === T_WHITESPACE) continue;
    if (is_array($tokens[$j]) && $tokens[$j][0] === T_STRING) { $name = $tokens[$j][1]; $i = $j; }
    break;
  }
  if (!$name) return null;

  $depth = 0;
  $buf = "";
  $started = false;
  for ($j = $i + 1; $j < $count; $j++) {
    $t = $tokens[$j];
    $str = is_array($t) ? $t[1] : $t;
    if ($str === "(") { $depth++; $started = true; if ($depth === 1) { $i = $j; continue; } }
    if ($str === ")") {
      $depth--;
      if ($depth === 0) { $i = $j; break; }
    }
    if ($started && $depth >= 1) $buf .= $str;
  }

  $params = [];
  $cur = "";
  $d = 0;
  $len = strlen($buf);
  for ($k = 0; $k < $len; $k++) {
    $ch = $buf[$k];
    if ($ch === "(" || $ch === "[" || $ch === "{") $d++;
    if ($ch === ")" || $ch === "]" || $ch === "}") $d--;
    if ($ch === "," && $d === 0) { $params[] = $cur; $cur = ""; continue; }
    $cur .= $ch;
  }
  if (trim($cur) !== "") $params[] = $cur;

  $parsedParams = [];
  foreach ($params as $p) {
    $p = trim(preg_replace('/\s+/', " ", $p));
    if ($p === "") continue;
    $variadic = strpos($p, "...") !== false;
    $byRef = (bool) preg_match('/&\s*\$/', $p);

    if (preg_match('/^(?:([\w\\\\|?&]+)\s+)?(\.{0,3}&?\$[\w]+)(.*)$/', $p, $m)) {
      $type = $m[1];
      $var = $m[2];
      $default = trim($m[3]);
    } else {
      $type = "";
      $var = $p;
      $default = "";
    }

    $parsedParams[] = [
      "type" => $type,
      "var" => $var,
      "default" => $default,
      "variadic" => $variadic,
      "byRef" => $byRef,
    ];
  }

  $returnType = null;
  for ($j = $i + 1; $j < $count; $j++) {
    $t = $tokens[$j];
    $str = is_array($t) ? $t[1] : $t;
    if (trim($str) === "") continue;
    if ($str === ":") {
      $rt = "";
      for ($k = $j + 1; $k < $count; $k++) {
        $kt = $tokens[$k];
        $ks = is_array($kt) ? $kt[1] : $kt;
        if ($ks === "{" || $ks === ";") break;
        $rt .= $ks;
      }
      $returnType = trim(preg_replace('/\s+/', " ", $rt));
    }
    break;
  }

  $sig = $visibility . ($static ? " static" : "") . ($abstract ? " abstract" : "")
    . " function " . $name . "(" . trim(preg_replace('/\s+/', " ", $buf)) . ")"
    . ($returnType ? ": " . $returnType : "");

  return [
    "name" => $name,
    "visibility" => $visibility,
    "static" => $static,
    "signature" => $sig,
    "params" => $parsedParams,
    "return" => $returnType,
  ];
}

// ============================ 第一遍：建索引 ============================

$files = [];
$it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($kernelRoot, FilesystemIterator::SKIP_DOTS));
foreach ($it as $f) {
  if ($f->getExtension() !== "php") continue;
  $path = $f->getPathname();
  if (strpos($path, "/vendor/") !== false) continue;
  if (strpos($path, "/.git/") !== false) continue;
  $files[] = $path;
}
sort($files);

$parsed = [];
foreach ($files as $file) {
  $info = parseFile($file);
  if ($info) $parsed[] = $info;
}

$classIndex = [];
$dirGroups = [];
foreach ($parsed as &$info) {
  $rel = ltrim(str_replace($kernelRoot, "", $info["file"]), "/");
  $relDir = dirname($rel);
  $dir = ($relDir === "." ? "" : strtolower($relDir));
  $info["rel"] = $rel;
  $info["dir"] = $dir;
  $info["url"] = "/php/api" . ($dir !== "" ? "/" . $dir : "") . "/" . kebab($info["class"]);
  $classIndex[strtolower($info["fqcn"])] = $info;
  $dirGroups[$dir][] = $info;
}
unset($info);

/** 把短名按当前文件的 use 表补全成完整类名 */
function resolveFqcn(string $name): string
{
  $name = ltrim(trim($name), "\\");
  $uses = $GLOBALS["__uses"] ?? [];
  if ($name === "") return $name;
  if (isset($uses[strtolower($name)])) return $uses[strtolower($name)];

  $parts = explode("\\", $name);
  $first = strtolower($parts[0]);
  if (isset($uses[$first])) {
    $rest = array_slice($parts, 1);
    return $uses[$first] . ($rest ? "\\" . implode("\\", $rest) : "");
  }
  return $name;
}

function linkClass(string $fqcn, array $index): string
{
  $resolved = resolveFqcn($fqcn);
  $key = strtolower(ltrim($resolved, "\\"));
  if (isset($index[$key])) {
    return "[" . $index[$key]["class"] . "](" . $index[$key]["url"] . ")";
  }
  return "`" . $fqcn . "`";
}

/**
 * 转义 Markdown 正文里的裸 HTML / Vue 插值
 *
 * 代码块（``` 围栏）内原样保留，只处理正文——否则 `<pre>`、`array<string>` 会被
 * Vue 当成未闭合标签，直接让 vitepress 构建失败。
 */
function escapeProse(string $text): string
{
  $lines = explode("\n", $text);
  $inFence = false;
  foreach ($lines as $i => $line) {
    if (preg_match('/^\s*```/', $line)) { $inFence = !$inFence; continue; }
    if ($inFence) continue;
    // 只中和「像标签」的尖括号：<div <pre </x <!；`=>`、`->` 这类保持原样
    $line = preg_replace('/<(?=[a-zA-Z!\/])/', "＜", $line);
    $line = preg_replace('/(?<=[a-zA-Z"])>/', "＞", $line);
    $line = str_replace(["{{", "}}"], ["{ {", "} }"], $line);
    $lines[$i] = $line;
  }
  return implode("\n", $lines);
}

/** 把 {@see X} / {@link X} / {@inheritdoc} 换成 Markdown 链接或行内代码，并做正文转义 */
function inline(string $text, array $index): string
{
  $text = preg_replace('/\{@inheritdoc\}/i', "继承自父类。", $text);
  $text = preg_replace_callback('/\{@(see|link)\s+([^}\s]+)([^}]*)\}/', function ($m) use ($index) {
    $target = $m[2];
    $rest = trim($m[3]);
    $clean = rtrim($target, "()");
    $label = linkClass($clean, $index);
    if ($rest !== "") $label .= " " . $rest;
    return $label;
  }, $text);
  return escapeProse($text);
}

// ============================ 第二遍：渲染 ============================

if (is_dir($outRoot)) {
  $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($outRoot, FilesystemIterator::SKIP_DOTS), RecursiveIteratorIterator::CHILD_FIRST);
  foreach ($it as $f) {
    $f->isDir() ? rmdir($f->getPathname()) : unlink($f->getPathname());
  }
} else {
  mkdir($outRoot, 0777, true);
}

$generated = 0;
foreach ($parsed as $info) {
  $GLOBALS["__uses"] = $info["uses"] ?? [];
  $targetDir = $outRoot . ($info["dir"] !== "" ? "/" . $info["dir"] : "");
  if (!is_dir($targetDir)) mkdir($targetDir, 0777, true);
  $target = $targetDir . "/" . kebab($info["class"]) . ".md";

  $tags = docTags($info["doc"]);
  $summary = inline(summary($info["doc"]), $classIndex);
  $body = inline(bodyText($info["doc"]), $classIndex);

  $publicMethods = array_values(array_filter($info["methods"], fn($m) => $m["visibility"] === "public"));
  $protectedMethods = array_values(array_filter($info["methods"], fn($m) => $m["visibility"] === "protected"));
  $privateMethods = array_values(array_filter($info["methods"], fn($m) => $m["visibility"] === "private"));

  $md  = "# " . $info["class"] . "\n\n";
  $md .= "`" . $info["fqcn"] . "`  ·  " . $info["kind"] . "\n\n";
  $md .= "源码：`gstudio_kernel/" . $info["rel"] . "`\n\n";
  if ($summary !== "") $md .= "> " . $summary . "\n\n";

  // 徽标
  $badges = [];
  if (!empty($tags["deprecated"])) $badges[] = "已废弃";
  if (!empty($tags["internal"])) $badges[] = "内部 API";
  if (!$publicMethods && !$privateMethods && !$protectedMethods) $badges[] = "无方法";
  if ($badges) $md .= implode(" · ", array_map(fn($b) => "**" . $b . "**", $badges)) . "\n\n";

  // 声明
  $md .= "## 声明\n\n```php\n" . $info["kind"] . " " . $info["class"];
  if ($info["extends"]) $md .= " extends " . $info["extends"];
  if ($info["implements"]) $md .= " implements " . implode(", ", $info["implements"]);
  $md .= "\n```\n\n";

  $inherit = [];
  if ($info["extends"]) $inherit[] = "父类：" . linkClass($info["extends"], $classIndex);
  foreach ($info["implements"] as $i) $inherit[] = "实现：" . linkClass($i, $classIndex);
  if ($inherit) $md .= implode("  \n", $inherit) . "\n\n";

  if ($body !== "") $md .= "## 概述\n\n" . $body . "\n\n";

  foreach (examples($info["doc"]) as $code) {
    $md .= "## 示例\n\n```php\n" . $code . "\n```\n\n";
  }

  if (!empty($tags["see"])) {
    $md .= "## 相关\n\n";
    foreach ($tags["see"] as $see) $md .= "- " . inline("{@see " . $see . "}", $classIndex) . "\n";
    $md .= "\n";
  }

  if (!empty($tags["deprecated"])) $md .= "::: warning 已废弃\n" . escapeProse(implode("\n", $tags["deprecated"])) . "\n:::\n\n";
  if (!empty($tags["internal"])) $md .= "::: tip 内部 API\n标记为 `@internal`，仅供框架内部使用。\n:::\n\n";

  // @method 伪方法（门面）
  if (!empty($tags["method"])) {
    $md .= "## 转发方法\n\n门面通过 `__callStatic` 转发到实例，以下为可用的静态方法：\n\n| 签名 | 说明 |\n|---|---|\n";
    foreach ($tags["method"] as $sig) {
      if (preg_match('/^(?:static\s+)?([\w\\\\|\[\]]+)\s+(\w+)\((.*?)\)\s*(.*)$/', $sig, $mm)) {
        $desc = trim($mm[4]) ?: "返回 " . $mm[1];
        $md .= "| `" . $mm[2] . "(" . trim($mm[3]) . ")` | " . escapeProse($desc) . " |\n";
      } else {
        $md .= "| `" . escapeProse($sig) . "` | — |\n";
      }
    }
    $md .= "\n";
  }

  // 常量
  if (!empty($info["constants"])) {
    $md .= "## 常量\n\n| 常量 | 值 | 说明 |\n|---|---|---|\n";
    foreach ($info["constants"] as $c) {
      $doc = inline(summary($c["doc"]), $classIndex);
      $value = $c["value"] !== "" ? "`" . escapeProse($c["value"]) . "`" : "—";
      $md .= "| `" . $c["name"] . "` | " . $value . " | " . ($doc ?: "—") . " |\n";
    }
    $md .= "\n";
  }

  // 属性
  $pubProps = array_values(array_filter($info["properties"], fn($p) => $p["visibility"] === "public"));
  $protProps = array_values(array_filter($info["properties"], fn($p) => $p["visibility"] !== "public"));
  if ($pubProps) {
    $md .= "## 属性\n\n| 属性 | 类型 | 默认值 | 说明 |\n|---|---|---|---|\n";
    foreach ($pubProps as $p) {
      $doc = inline(summary($p["doc"]), $classIndex);
      $default = "—";
      if ($p["default"] !== "") {
        $dv = escapeProse($p["default"]);
        $default = "`" . (mb_strlen($dv) > 40 ? mb_substr($dv, 0, 40) . "`…" : $dv . "`");
      }
      $md .= "| `" . ($p["static"] ? "static " : "") . $p["name"] . "` | `" . escapeProse(normType($p["type"])) . "` | " . $default . " | " . ($doc ?: "—") . " |\n";
    }
    $md .= "\n";
  }
  if ($protProps) {
    $md .= "## 受保护 / 私有属性\n\n| 属性 | 类型 | 可见性 | 说明 |\n|---|---|---|---|\n";
    foreach ($protProps as $p) {
      $doc = inline(summary($p["doc"]), $classIndex);
      $md .= "| `" . $p["name"] . "` | `" . escapeProse(normType($p["type"])) . "` | " . $p["visibility"] . " | " . ($doc ?: "—") . " |\n";
    }
    $md .= "\n";
  }

  // 方法
  if (!$publicMethods) {
    $md .= "## 方法\n\n本类没有公开方法。\n\n";
  } else {
    $md .= "## 方法一览\n\n| 方法 | 说明 |\n|---|---|\n";
    foreach ($publicMethods as $m) {
      $s = str_replace("|", "\\|", inline(summary($m["doc"]), $classIndex));
      $md .= "| [`" . $m["name"] . "()`](#" . strtolower($m["name"]) . ") | " . ($s ?: "—") . " |\n";
    }
    $md .= "\n";

    foreach ($publicMethods as $m) {
      $mtags = docTags($m["doc"]);
      $md .= "### " . $m["name"] . "()\n\n";
      $md .= "```php\n" . $m["signature"] . "\n```\n\n";

      $ms = inline(summary($m["doc"]), $classIndex);
      if ($ms !== "") $md .= $ms . "\n\n";
      $mBody = inline(bodyText($m["doc"]), $classIndex);
      if ($mBody !== "") $md .= $mBody . "\n\n";

      foreach (examples($m["doc"]) as $code) {
        $md .= "```php\n" . $code . "\n```\n\n";
      }

      if (!empty($m["params"])) {
        $md .= "| 参数 | 类型 | 默认值 | 说明 |\n|---|---|---|---|\n";
        foreach ($m["params"] as $p) {
          $pname = trim(ltrim($p["var"], "&."), "$");
          $pdoc = "";
          $ptype = "";
          foreach ($mtags["param"] ?? [] as $pd) {
            if (preg_match('/^([\w\\\\|\[\]]+)\s+&?\.{0,3}\$' . preg_quote($pname, "/") . '\s*(.*)$/', $pd, $pm)) {
              $ptype = $pm[1];
              $pdoc = trim($pm[2]);
              break;
            }
          }
          $type = $p["type"] ?: $ptype;
          if ($p["variadic"]) $type = "..." . $type;
          if ($type === "") $type = "mixed";
          $default = $p["default"] !== "" ? "`" . trim(preg_replace('/^=\s*/', "", $p["default"])) . "`" : "—";
          $md .= '| `$' . $pname . '` | `' . escapeProse($type) . "` | " . $default . " | " . (inline($pdoc, $classIndex) ?: "—") . " |\n";
        }
        $md .= "\n";
      }

      if ($m["return"]) {
        $ret = $mtags["return"][0] ?? "";
        $md .= "返回：`" . escapeProse($m["return"]) . "`" . ($ret ? " —— " . inline($ret, $classIndex) : "") . "\n\n";
      }
      if (!empty($mtags["throws"])) {
        $md .= "可能抛出：\n\n";
        foreach ($mtags["throws"] as $thr) {
          $md .= "- " . inline("{@see " . trim($thr) . "}", $classIndex) . "\n";
        }
        $md .= "\n";
      }
      if (!empty($mtags["deprecated"])) {
        $md .= "::: warning 已废弃\n" . implode("\n", $mtags["deprecated"]) . "\n:::\n\n";
      }
    }
  }

  if ($protectedMethods || $privateMethods) {
    $md .= "## 非公开方法\n\n";
    if ($protectedMethods) {
      $md .= "**protected**\n\n";
      foreach ($protectedMethods as $m) {
        $s = inline(summary($m["doc"]), $classIndex);
        $md .= "- `" . $m["signature"] . "`" . ($s !== "" ? " —— " . $s : "") . "\n";
      }
      $md .= "\n";
    }
    if ($privateMethods) {
      $md .= "**private**\n\n";
      foreach ($privateMethods as $m) {
        $s = inline(summary($m["doc"]), $classIndex);
        $md .= "- `" . $m["signature"] . "`" . ($s !== "" ? " —— " . $s : "") . "\n";
      }
      $md .= "\n";
    }
  }

  // 同目录
  $siblings = array_filter($dirGroups[$info["dir"]] ?? [], fn($i) => $i["fqcn"] !== $info["fqcn"]);
  if ($siblings) {
    $md .= "## 同目录\n\n";
    usort($siblings, fn($a, $b) => strcmp($a["class"], $b["class"]));
    foreach ($siblings as $s) {
      $md .= "- [" . $s["class"] . "](" . $s["url"] . ")\n";
    }
    $md .= "\n";
  }

  file_put_contents($target, $md);
  $generated++;
}

echo "生成 {$generated} 篇（索引 " . count($classIndex) . " 个类）\n";

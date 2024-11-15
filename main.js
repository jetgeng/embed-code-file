/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => EmbedCodeFile
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// settings.ts
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  includedLanguages: [
    "markup",
    "css",
    "clike",
    "javascript",
    "abap",
    "actionscript",
    "ada",
    "apacheconf",
    "apl",
    "applescript",
    "arduino",
    "arff",
    "asciidoc",
    "asm6502",
    "aspnet",
    "autohotkey",
    "autoit",
    "bash",
    "basic",
    "batch",
    "bison",
    "brainfuck",
    "bro",
    "c",
    "csharp",
    "cpp",
    "coffeescript",
    "clojure",
    "crystal",
    "csp",
    "css-extras",
    "d",
    "dart",
    "diff",
    "django",
    "docker",
    "eiffel",
    "elixir",
    "elm",
    "erb",
    "erlang",
    "fsharp",
    "flow",
    "fortran",
    "gedcom",
    "gherkin",
    "git",
    "glsl",
    "gml",
    "go",
    "graphql",
    "groovy",
    "haml",
    "handlebars",
    "haskell",
    "haxe",
    "http",
    "hpkp",
    "hsts",
    "ichigojam",
    "icon",
    "inform7",
    "ini",
    "io",
    "j",
    "java",
    "jolie",
    "json",
    "julia",
    "keyman",
    "kotlin",
    "latex",
    "less",
    "liquid",
    "lisp",
    "livescript",
    "lolcode",
    "lua",
    "makefile",
    "markdown",
    "markup-templating",
    "matlab",
    "mel",
    "mizar",
    "monkey",
    "n4js",
    "nasm",
    "nginx",
    "nim",
    "nix",
    "nsis",
    "objectivec",
    "ocaml",
    "opencl",
    "oz",
    "parigp",
    "parser",
    "pascal",
    "perl",
    "php",
    "php-extras",
    "plsql",
    "powershell",
    "processing",
    "prolog",
    "properties",
    "protobuf",
    "pug",
    "puppet",
    "pure",
    "python",
    "q",
    "qore",
    "r",
    "jsx",
    "tsx",
    "renpy",
    "reason",
    "rest",
    "rip",
    "roboconf",
    "ruby",
    "rust",
    "sas",
    "sass",
    "scss",
    "scala",
    "scheme",
    "smalltalk",
    "smarty",
    "sql",
    "soy",
    "stylus",
    "swift",
    "tap",
    "tcl",
    "textile",
    "tt2",
    "twig",
    "typescript",
    "vbnet",
    "velocity",
    "verilog",
    "vhdl",
    "vim",
    "visual-basic",
    "wasm",
    "wiki",
    "xeora",
    "xojo",
    "xquery",
    "yaml"
  ],
  titleBackgroundColor: "#00000020",
  titleFontColor: ""
};

// main.ts
var EmbedCodeFile = class extends import_obsidian2.Plugin {
  async onload() {
    await this.loadSettings();
    this.registerMarkdownPostProcessor((element, context) => {
      this.addTitle(element, context);
    });
    const supportedLanguages = this.settings.includedLanguages;
    supportedLanguages.forEach((l) => {
      this.registerRenderer(l);
    });
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async registerRenderer(lang) {
    this.registerMarkdownCodeBlockProcessor(`embed-${lang}`, async (meta, el, ctx) => {
      let fullSrc = "";
      let src = "";
      let metaYaml;
      try {
        metaYaml = (0, import_obsidian2.parseYaml)(meta);
      } catch (e) {
        await import_obsidian2.MarkdownRenderer.renderMarkdown("`ERROR: invalid embedding (invalid YAML)`", el, "", this);
        return;
      }
      let srcPath = metaYaml.path;
      if (!srcPath) {
        await import_obsidian2.MarkdownRenderer.renderMarkdown("`ERROR: invalid source path`", el, "", this);
        return;
      }
      const activeFile = this.app.workspace.getActiveFile();
      if (!activeFile || !activeFile.path) {
        await import_obsidian2.MarkdownRenderer.renderMarkdown("`ERROR: invalid source path`", el, "", this);
        return;
      }
      let fullPath = this.app.metadataCache.getFirstLinkpathDest(srcPath, activeFile.path);
      if (!fullPath) {
        await import_obsidian2.MarkdownRenderer.renderMarkdown("`ERROR: invalid source path`", el, "", this);
        return;
      }
      fullSrc = await app.vault.read(fullPath);
      let title = metaYaml.title;
      if (!title) {
        title = srcPath;
      }
      await import_obsidian2.MarkdownRenderer.renderMarkdown("```" + lang + "\n" + fullSrc + "\n```", el, "", this);
      this.addTitleLivePreview(el, title);
    });
  }
  addTitleLivePreview(el, title) {
    const codeElm = el.querySelector("pre > code");
    if (!codeElm) {
      return;
    }
    const pre = codeElm.parentElement;
    this.insertTitlePreElement(pre, title);
  }
  addTitle(el, context) {
    let codeElm = el.querySelector("pre > code");
    if (!codeElm) {
      return;
    }
    const pre = codeElm.parentElement;
    const codeSection = context.getSectionInfo(pre);
    if (!codeSection) {
      return;
    }
    const view = app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (!view) {
      return;
    }
    const num = codeSection.lineStart;
    const codeBlockFirstLine = view.editor.getLine(num);
    let matchTitle = codeBlockFirstLine.match(/TITLE:\s*"([^"]*)"/i);
    if (matchTitle == null) {
      return;
    }
    const title = matchTitle[1];
    if (title == "") {
      return;
    }
    this.insertTitlePreElement(pre, title);
  }
  insertTitlePreElement(pre, title) {
    pre.querySelectorAll(".obsidian-embed-code-file").forEach((x) => x.remove());
    let titleElement = document.createElement("pre");
    titleElement.appendText(title);
    titleElement.className = "obsidian-embed-code-file";
    pre.prepend(titleElement);
  }
};

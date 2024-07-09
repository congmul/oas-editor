import { getLocationForJsonPath } from "@stoplight/json";
import { getLocationForJsonPath as getLocationForJsonPathYAML } from "@stoplight/yaml";

export class NavigationService {
  static async scrollTo(
    editor: any,
    jsonPointer: any,
    spec: any,
    language = 'yaml',
  ) {
    try {
      const location = language === 'json' ? getLocationForJsonPath(spec, jsonPointer) : getLocationForJsonPathYAML(spec, jsonPointer);
      if (!location || typeof location.range.start.line !== 'number') {
        return;
      }
      location && this.scrollToEditorLine(editor, location.range.start.line + 1);
    } catch (e) {
      console.error(e);
    }
  }

  static async scrollToHash(hash?: string) {
    hash = hash || window.location.hash.substring(1);
    try {
      const escapedHash = CSS.escape(hash);
      if (!escapedHash || escapedHash === '#') {
        return;
      }

      const items = document.querySelectorAll(
        escapedHash.startsWith('#') ? escapedHash : `#${escapedHash}`,
      );
      if (items.length) {
        const element = items[0];
        typeof element.scrollIntoView === 'function' &&
          element.scrollIntoView();
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async scrollToEditorLine(editor:any, startLine: number, columnLine = 1) {
    try {      
      editor && editor.revealLineInCenter(startLine);
      editor && editor.setPosition({ lineNumber: startLine, column: columnLine });
    } catch (err) {
      console.error(err);
    }
  }
}
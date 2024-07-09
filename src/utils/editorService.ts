export function applyErrorMarkers(errors: any[] = [], editorIns:any, monacoIns:any) {
    if(!editorIns || !monacoIns) return;

    const model = editorIns.getModel();
    if(!model) return;

    editorIns.createDecorationsCollection([]);
    monacoIns.editor.setModelMarkers(model, 'owner', []);
    if(errors.length === 0) return;

    const { markers, decorations } = createErrorMarkers(errors, monacoIns);
    monacoIns.editor.setModelMarkers(model, 'owner', markers);
    editorIns.createDecorationsCollection(decorations);
}

function createErrorMarkers(errors: any[] = [], Monaco: any, docFormat = 'json'){
    errors = errors || [];
    const newDecorations: any[] = [];
    const newMarkers: any[] = [];
    errors.forEach(err => {
      const { code, message, severity } = err;
      const propertyLeng = err.path && err.path.length > 0 ? err.path[err.path.length - 1].length : 0;
      let location = { 
        start: { 
          line: err.range.start.line + 1, 
          character: err.range.start.character - propertyLeng > 0 && propertyLeng > 1 
            ? docFormat === 'json' ? err.range.start.character - propertyLeng - 1 : err.range.start.character - propertyLeng
            : err.range.start.character + 2 
        },
        end: { 
          line: err.range.start.line + 1, 
          character: propertyLeng > 1 
          ? docFormat === 'json' ? err.range.start.character - 1 : err.range.start.character
          : err.range.start.character + 3 
        } 
      };
      const detailContent = message ? `\n\n${message}` : '';
      newMarkers.push({
        startLineNumber: location.start.line,
        startColumn: location.start.character,
        endLineNumber: location.end.line,
        endColumn: location.end.character,
        severity: severity === 0 ? Monaco.MarkerSeverity.Error : Monaco.MarkerSeverity.Warning,
        message: `${code}${detailContent}`,
      });
      newDecorations.push({
        id: 'openapi',
        ownerId: 0,
        range: new Monaco.Range(
          location.start.line, 
          location.start.character, 
          location.end.line, 
          location.end.character
        ),
        options: { inlineClassName: 'color-text-decoration-error' },
      });
    });
  
    return { decorations: newDecorations, markers: newMarkers };  
}
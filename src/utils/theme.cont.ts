export enum Theme {
    LIGHT = 'LIGHT',
    DARK = 'DARK'
}

export const EditorThemeData = {
    [Theme.LIGHT]: {
        base: 'vs',
        inherit: true,
        colors: {
          'editor.background': '#ffffff',
          'editor.lineHighlightBackground': '#F3F3F3',
        },
        rules: [{ token: '', background: '#ffffff' }],
    },
    [Theme.DARK]: {
        base: 'vs-dark',
        inherit: true,
        colors: {
          'editor.background': '#252f3f',
          'editor.lineHighlightBackground': '#1f2a37',
        },
        rules: [{ token: '', background: '#252f3f' }],
    }
}

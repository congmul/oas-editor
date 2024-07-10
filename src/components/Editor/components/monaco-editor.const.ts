export enum EditorTheme {
    LIGHT = 'LIGHT',
    DARK = 'DARK'
}

export const EditorThemeData = {
    [EditorTheme.LIGHT]: {
        base: 'vs',
        inherit: true,
        colors: {
          'editor.background': '#ffffff',
          'editor.lineHighlightBackground': '#F3F3F3',
        },
        rules: [{ token: '', background: '#ffffff' }],
    },
    [EditorTheme.DARK]: {
        base: 'vs-dark',
        inherit: true,
        colors: {
          'editor.background': '#252f3f',
          'editor.lineHighlightBackground': '#1f2a37',
        },
        rules: [{ token: '', background: '#252f3f' }],
    }
}

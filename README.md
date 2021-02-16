# vite-plugin-shell-cycles

Execute shell command(s) sequentially or Synchronously at different lifecycle hooks.

```
npm i vite-plugin-shell-cycles -D
```

## Examples

```javascript
// vite.config.ts
import shell from 'vite-plugin-shell-cycles'

export default defineConfig({
  plugins: [
      shell({
      buildStart: {
        commands: ['echo run my script'],
      },
      buildEnd: {
        commands: ['echo end my script'],
      },
      closeWatcher: {
        commands: ['echo close watcher'],
      },
      watchChange: {
        commands: ['echo watch change'],
      },
      moduleParsed: {
        commands: ['echo moduleParsed'],
      },
      generateBundle: {
        commands: ['echo generateBundle'],
      },
      renderError: {
        commands: ['echo render error'],
      },
      renderStart: {
        commands: ['echo render start'],
      },
      writeBundle: {
        commands: ['echo write bundle'],
      },
      transformIndexHtml: {
        commands: ['echo transform that html'],
      },
  ]
})
```
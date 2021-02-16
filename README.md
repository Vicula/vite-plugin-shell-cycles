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
        sync:true
      },
      writeBundle: {
        commands: ['echo write bundle'],
        sync:false //default
      },
      transformIndexHtml: {
        commands: ['echo This hook is called every update cycle','echo WIP: need to add ability to use variables from these hooks','echo I am called after we handle the module update'],
      },
       configureServer: {
        commands: ['echo server has read config and been configured','WIP: need to add ability to use variables from these hooks',],
      },
        handleHotUpdate: {
        commands: ['echo This hook is called every update cycle','echo I am in regards to the file being updated'],
      },
    })
  ]
})
```
import { spawn, spawnSync } from 'child_process'
import { exportOptions, importOptions, Script } from './types'
import chalk from 'chalk'

export default function execute(input: importOptions): exportOptions {
  return new ShellPlugin(input)
}

class ShellPlugin {
  readonly name: string
  readonly expected: string[]
  constructor(i: importOptions) {
    try {
      this.expected = [
        'buildEnd',
        'buildStart',
        'closeWatcher',
        'watchChange',
        'moduleParsed',
        'generateBundle',
        'renderError',
        'renderStart',
        'writeBundle',
        'transformIndexHtml',
        'configureServer',
        'handleHotUpdate',
      ]
      this.name = 'shell-cycles'
      if (typeof i !== 'object' && i === null)
        throw 'expected import to be an object'

      for (const k in i) {
        this.validateKey(i[k], k) && this.addProperty(i[k], k)
      }
    } catch (e) {
      console.error(
        `${chalk.white.bgRed.bold('Shell-Cycles:Error')} ${chalk.red(
          'expected an object, but got'
        )} ${chalk.underline(typeof i)}`
      )
      console.error('---------------')
      console.error(e)
    }
  }
  private addProperty(i: Script, k: string): void {
    this[k] = () => {
      this.runScripts(i)
    }
  }

  private validateKey(i: Script, k: string): i is Script {
    let z = false
    let n = false
    try {
      this.expected.forEach((b: string) => {
        b === k && (n = true)
      })
      if (n) {
        try {
          i.commands.forEach((b: string) => {
            if (typeof b !== 'string') {
              z = true
            }
          })
        } catch (e) {
          console.error(
            `${chalk.white.bgRed.bold('Shell-Cycles:Error')} ${chalk.underline(
              k
            )}'s ${chalk.red(
              'commands property didnt exist or wasnt an array of strings so was skipped'
            )}`
          )
          console.error('---------------')
          console.error(e)
          return false
        }
        return i && i.commands && !z
      } else {
        throw `${k} wasnt found in the importOptions`
      }
    } catch (p) {
      console.error(
        `${chalk.white.bgRed.bold('Shell-Cycles:Error')} ${chalk.underline(
          k
        )}'s ${chalk.red('wasnt an expexted import option')}`
      )
      console.error('---------------')
      console.error(p)
    }
    return true
  }
  private runScripts(cb: Script) {
    const z: string[] = cb.commands.slice(0)
    const next = function () {
      let c: string
      if (!(c = z.shift())) {
        return
      }

      if (cb.sync !== undefined && cb.sync === true) {
        const r = spawnSync(c, {
          shell: true,
          stdio: 'inherit',
          env: process.env,
        })
        if (r.status === 0) {
          next()
        }
      } else {
        spawn(c, {
          shell: true,
          stdio: 'inherit',
          env: process.env,
        }).on('close', (b) => {
          if (b === 0) {
            next()
          }
        })
      }
    }
    next()
  }
}

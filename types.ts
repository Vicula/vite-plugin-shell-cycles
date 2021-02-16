export interface Script {
  commands: string[]
  sync?: boolean
}

export interface importOptions {
  buildEnd?: Script
  buildStart?: Script
  closeWatcher?: Script
  watchChange?: Script
  moduleParsed?: Script
  generateBundle?: Script
  renderError?: Script
  renderStart?: Script
  writeBundle?: Script
  transformIndexHtml?: Script
  configureServer?: Script
  handleHotUpdate?: Script
}

export interface exportOptions {
  name: string

  // Called on dev
  buildEnd?: () => void
  buildStart?: () => void
  closeWatcher?: () => void
  watchChange?: () => void
  transformIndexHtml?: () => void //every time dev server changes/reloads/navigates
  configureServer?: () => void
  handleHotUpdate?: () => void

  // Called on build
  moduleParsed?: () => void
  renderError?: () => void
  renderStart?: () => void
  writeBundle?: () => void
  generateBundle?: () => void

  // called on both
  closeBundle?: () => void
}

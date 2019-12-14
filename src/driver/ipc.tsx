const { ipcRenderer } = window.electron

// ==========================================================
export const getNamespaces = () => {
  const namespaces = ipcRenderer.sendSync('namespaces')
  console.log('Namespaces', namespaces)
}

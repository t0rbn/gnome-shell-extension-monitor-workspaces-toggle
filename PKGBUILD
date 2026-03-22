# Maintainer: Torben Gustke <torben@example.com>
pkgname=gnome-shell-extension-monitor-workspaces-toggle
pkgver=1
pkgrel=1
pkgdesc=GNOME shell extension that adds a quick settings toggle to switch workspaces between 'Primary display only' and 'All displays'.
arch=('any')
url="https://github.com/torben/gnome-shell-extension-workspace-multi-monitor-quick-toggle"
license=('WTFPL')
depends=('gnome-shell>=45')

_uuid="gnome-shell-extension-monitor-workspaces-toggle@t0rbn"

build() {
    : # nothing to compile
}

package() {
    local extdir="${pkgdir}/usr/share/gnome-shell/extensions/${_uuid}"
    install -dm755 "${extdir}"
    install -m644 "${startdir}/metadata.json" "${extdir}/metadata.json"
    install -m644 "${startdir}/extension.js"  "${extdir}/extension.js"
}

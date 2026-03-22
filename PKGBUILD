# Maintainer: Torben Gustke <torben@example.com>
pkgname=gnome-shell-extension-workspace-multi-monitor-quick-toggle
pkgver=1
pkgrel=1
pkgdesc="GNOME Shell quick settings toggle to switch workspaces between primary display only and all displays"
arch=('any')
url="https://github.com/torben/gnome-shell-extension-workspace-multi-monitor-quick-toggle"
license=('GPL-3.0-or-later')
depends=('gnome-shell>=45')

_uuid="workspace-multi-monitor-quick-toggle@gnome-shell-extensions"

build() {
    : # nothing to compile
}

package() {
    local extdir="${pkgdir}/usr/share/gnome-shell/extensions/${_uuid}"
    install -dm755 "${extdir}"
    install -m644 "${startdir}/metadata.json" "${extdir}/metadata.json"
    install -m644 "${startdir}/extension.js"  "${extdir}/extension.js"
}

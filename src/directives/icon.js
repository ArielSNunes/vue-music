export const IconDirective = {
    beforeMount(el, { value, modifiers, arg, ...bindings }) {
        let classIcon = `fa fa-${value} text-xl`

        if (arg === 'full') {
            classIcon = value
        }

        if (modifiers.right) {
            classIcon += ' float-right '
        }

        if (modifiers.yellow) {
            classIcon += ' text-yellow-400 '
        } else {
            classIcon += ' text-green-400 '
        }

        el.innerHTML += `<i class="${classIcon}"></i>`
    }
}
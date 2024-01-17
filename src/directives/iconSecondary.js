export const IconSecondaryDirective = {
    beforeMount(el, { value, modifiers, arg, ...bindings }) {
        let classIcon = `fa fa-${value.icon} text-green-400 text-xl`

        if (value.right) {
            classIcon += ' float-right '
        }

        el.innerHTML += `<i class="${classIcon}"></i>`
    }
}
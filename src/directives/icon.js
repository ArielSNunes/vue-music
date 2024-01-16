export const IconDirective = {
    beforeMount(el, binding) {
        let classIcon = `fa fa-${binding.value} float-right text-green-400 text-xl`
        if (binding.arg === 'full') {
            classIcon = binding.value
        }
        el.innerHTML += `<i class="${classIcon}"></i>`
    }
}
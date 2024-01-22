import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/upperFirst'

export default {
    install(app) {
        const baseComponents = import.meta.glob('../components/base/*.vue', {
            eager: true
        })
        
        Object.entries(baseComponents).forEach(([path, module]) => {
            const lastName = path.split('/').pop().replace(/\.\w+$/, '')
            const componentName = upperFirst(camelCase(lastName))

            app.component(`Base${componentName}`, module.default)
        })
    }
}
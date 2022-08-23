export const createComponentInstance = (vnode) => {
    //生成组件实例
    const component = {
        vnode,
        type: vnode.type,
        setupState:{}
    }
    return component;
};

export const setupComponent = (instance) => {

        //initProps()    
        //initSlots()
        setupStatefulComponent(instance)
};

const setupStatefulComponent = (instance) => {
    const Component = instance.type
    instance.proxy = new Proxy({}, {
        get(target, key) {
    const { setupState } = instance;

            if (key in setupState) {
                return setupState[key]
            }

            if (key == '$el') {
                return instance.vnode.el
            }
        }
    })
    const { setup } = Component
    
    if (setup) {
        const setupResult= setup()
        handleSetupResult(instance,setupResult)
    }
};

const handleSetupResult = (instance,setupResult) => {
    if (typeof setupResult == 'object') {
        instance.setupState=setupResult
    }

    finishComponentSetup(instance)
};

const finishComponentSetup = (instance) => {
    const Component = instance.type
        instance.render=Component.render
};
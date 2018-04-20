interface Methods {
  [key: string]: boolean;
}

export function logMethods(...methodNames: string[]) {
  const methods: Methods = {};
  methodNames.forEach(methodName => {
    methods[methodName] = true
  })
  return {
    enabled: false,
    methods,
  }
}

export function filterMethods(...methodNames: string[]) {
  const methods: Methods = {};
  methodNames.forEach(methodName => {
    methods[methodName] = false
  })
  return {
    enabled: true,
    methods,
  }
}

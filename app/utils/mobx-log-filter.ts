import { get } from 'lodash'

const getMobxLoggerConfig = (object: any) => {
  return get(object.constructor, ['mobxLoggerConfig'])
}

export default function logFilter(change: any): boolean {
  const isReaction = change.type === 'reaction' || change.type === 'scheduled-reaction'
  const isAction = change.type === 'action'

  if (isAction) {
    const mobxLoggerConfig = getMobxLoggerConfig(change.object)
    const isDisabled = get(mobxLoggerConfig, ['methods', change.name]) === false
    return !isDisabled
  }

  return !isReaction
}

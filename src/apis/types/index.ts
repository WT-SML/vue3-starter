// API 类型统一出口，业务侧统一从 `~/apis/types` 引入：
//   import type { LoginParams } from '~/apis/types'
// 新增接口模块时，在 types 下按模块名新建文件并在此导出即可
export type * from './common'
export type * from './user'

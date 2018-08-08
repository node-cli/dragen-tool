
## 使用
根据package.json中bin项的配置
task-tools start name  执行某个任务
task-tools-run  执行gulp任务
有command配置，则task-tools start name 某个项目

npm run init的作用？提醒安装依赖模块？
npm_config_argv ???
NPM_CLI
install which安装 。。npm tnpm


## 任务

- dist dist清除与webpack编译
- clean 清理
- watch-tsc 监听编译
- tsc 编译

- ts-lint
- ts-lint-fix

# npm cli包

1. 通过执行命令， 自动生成项目代码模板
2. 项目代码模板可以自定义编辑
3. CLI可以通过软件包形式分发，其他开发者可以简单使用

## 解决问题所需要的工具

1. commander  Node命令交互接口实现工具
2. git-clone Node编写的git clone封装，可以快速从github上克隆项目模板
2. shelljs轻量的Node编写的系统命令封装，可以快速在Node代码中使用系统命令


## npm link 启用命令行

Option(): 初始化自定义参数对象，设置“关键字”和“描述”
Command(): 初始化命令行参数对象，直接获得命令行输入；增加自定义命令
Command#command(): 定义一个命令名字
Command#action(): 注册一个callback函数
Command#option(): 定义参数，需要设置“关键字”和“描述”，关键字包括“简写”和“全写”两部分，以”,”,”|”,”空格”做分隔。
Command#parse(): 解析命令行参数argv
Command#description(): 设置description值
Command#usage(): 设置usage值



## package.json 依赖
dependencies  运行时需要
devDependencies  开发过程中需要
peerDependencies  发面包时需要
optionalDependencies  可选依赖，便即wg依赖安装失败，也会认为整个过程是成功的
bundledDependencies   打包依赖，发布时，这个数组中的包都会被打包


## pre-commit 钩子中运行npm script, 即git 提交时运行

eslint: 进行 JavaScript 代码检查的基础包；.eslintrc文件，eslintignore；
eslint-config-standard：ESLint 基础规则包，也可以引用其他规则包或者自己维护一份；
husky：在 .git/hooks 中写入 pre-commit 等脚本激活钩子，在 Git 操作时触发；
lint-staged：参考 Git 中 staged 暂存区概念，在每次提交时只检查本次提交的文件。

> husky 利用钩子探测到 commit 大巴并拦住后，lint-staged 接手并对坐在 commit 校车里面那堆暂存区 js 小弟逐个用 ESLint 扫描仪进行安检，并帮这帮小弟一个个把无伤大雅的安检问题解决掉，但只要出现一个解决不掉的问题安检就不通过，这辆 commit 大巴就别想过去。

## deprecated配置

## lint-staged  可以和pre-commit结合

## theme

## typings

## config

## module, main

## 设计思想， task-tools-->gulp-->webpack

## gulp基本

- task (的方法 pipe, 事件监听 on) 都是流的相关操作
- src  输入
- dest  输出



- tsc命令  -p 包含tsconfig.json的目录
- files指定文件路径列表
- include, exclude: glob匹配模式；files>exclude>include
- outDir默认会被排队在编译输入文件之外
- extends 继承的配置文件
- compileOnSave 保存时重新编译文件
- compilerOptions  配置编译选项
- types 指定类型定义的包 与typeRoots  指定类型定义包的目录  只对npm安装的声明模块有效
- 声明模块会包含一个 index.d.ts文件【<reference path="custom.d.ts"/>】 或者package.json中设置了types字段，默认在node_modules/@types，typeRoots指定默认的类型声明文件查找路径，默认为node_modules/@types
- allowJs 是否允许编译js文件
- allowUnreachableCode：是否允许到达不了的代码，默认为false不允许，为true时，不会报告到达不了代码的错误

- alwaysStrict“是否总是以严格模式解析文件，并未每个源文件生成use strict语句

- baseUrl：解析非相对模块名的基准目录

- charset：输入文件的字符集

- checkJs：当编译js文件时，报告其中的错误，需要allowJs

- declaration：是否生成相应的.d.ts文件，默认为false

- declarationDir：生成.d.ts文件的输出路径，未指定时与生成js文件目录相同

- diagnostics：是否显示诊断信息，默认false

- disableSizeLimit：是否禁用js工程体积大小的限制，默认false

- emitBom：是否在输出文件头加入UTF-8字节序标志

- emitDecoratorMetadata：

- noUnusedParameters：不允许未使用的函数参数

- noUnusedLocals：不允许未使用的局部变量

- allowSyntheticDefaultImports：允许从没有设置默认导出的模块中默认导入

- target ：编译目标：ES3为默认、ES5、ES6、ES2015、ES2016、ES2017等

- 给源码里的装饰器声明加上设计类型元数据，即design:开头的元数据，有三个design:type、design:returntype、design:paramtypes,分别为类型、返回类型、参数类型，好像可以在运行时获取到ts类型,这几个元数据是当源码对类、方法、属性使用装饰器时，自动加上的

- experimentalDecorators：启用实验性的ES装饰器，不启用时使用装饰器会报错

- forceConsistentCasingInFileNames：禁止对同一个文件的不一致的引用

- inlineSourceMap：生成单个sourceMap文件，而不是生成一个

- inlineSources：将sourceMap与代码生成到一个文件

- isolatedModules：将每个文件作为单独的模块

- jsx：在tsx文件里支持jsx，值为React或Preserve

- jsxFactory：当jsx为React时，使用的JSX工厂函数

- lib字符串数组，需要引入的库文件列表，如果未指定则对相应的编译目标有相应的默认库

- listEmittedFiles：打印编译后生成文件名字

- listFiles：编译过程中打印文件名

- locale：显示错误信息的语言

- maoRoot：为调试器指定sourceMap文件的路径，当.map与.js文件位置不同时使用

- maxNodeModuleJsDepth：当allowJs为true时，node_modules搜索依赖的深度

- module：生成的模块系统代码：None、CommanJs、AMD、System、UMD、ES6、ES2015

- newLine：为生成文件指定行结束符

- noEmit：不生成输出文件

- noEmitHelpers：不生成用户自定义的帮助函数代码，如__extends

- noEmitOnError:当报错时不生成输出文件

- noFallthroughCasesInSwitch：报告switch语句的fallthrough错误，即不允许case贯穿执行

- noImplicitAny 无法根据变量判断类型时用any代替，true强制类型检查，无法推断时，提示错误

- noImplicitReturns：不允许函数隐含返回，即所有返回路径必须由返回值

- noImplicitThis：当this为any类型时报错

- noImplicitUseStrict：输出文件中不包含use strict指令

- noLib：不包含默认的库文件

- noResolve：不对<referwence>或模块导入的文件进行编译

- noStrictGenericChecks：禁用在函数类型中对范型类型进行严格检查

- outDir：重定向输出目录

- outFile：将输出文件合并为一个文件

- paths：模块名到基于baseUrl路径映射列表

- preserveConstEnums：保留const enum声明

- preserveSymlinks：不把符号链接解析为真实路径，符号链接文件为真实文件

- removeComments：删除所有注释，除了以/!*开头的版权信息

- sourceMap：是否生成.map文件
- module 遵循的js模块规范  commonjs, AMD, es2015

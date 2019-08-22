<template>
	<el-container>
		<el-col :span="24" class="header">
			<el-col :span="5" class="logo" :class="'logo-width'">
				<a href="/">
					博客后台管理
				</a>
			</el-col>
			<el-col :span="14">
				<div class="title">
					<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
					 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
						<el-submenu index="1">
							<template slot="title">我的工作台</template>
							<el-submenu index="1-1">
								<template slot="title">技术博客</template>
								<el-menu-item index="1-1-1">Java</el-menu-item>
								<el-menu-item index="1-1-2">Python</el-menu-item>
								<el-menu-item index="1-1-3">Linux</el-menu-item>
							</el-submenu>
							<el-menu-item index="1-2">其他言论</el-menu-item>
							<el-menu-item index="1-3">博客撰写</el-menu-item>
							<el-menu-item index="1-4">权限设置</el-menu-item>
						</el-submenu>
						<el-menu-item index="2">消息中心</el-menu-item>
					</el-menu>
				</div>
			</el-col>
			<el-col :span="5" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						你好：管理员
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>
							<a href="#/">首页</a>
						</el-dropdown-item>
						<el-dropdown-item>
							<a href="javascript:;">修改密码</a>
						</el-dropdown-item>
						<el-dropdown-item>
							注销登录
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside>
				<el-menu :default-active="activeIndex" background-color="#545c64" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
				 :collapse="isCollapse" text-color="#CCC" active-text-color="">
				<el-submenu index="1-1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span slot="title">技术博客</span>
					</template>
					<el-menu-item index="1-1-1" route="java" >Java</el-menu-item>
					<el-menu-item index="1-1-2" route="python">Python</el-menu-item>
					<el-menu-item index="1-1-3" route="linux">Linux</el-menu-item>
				</el-submenu>
				<el-menu-item index="1-2">
					<i class="el-icon-menu"></i>
					<span slot="title">其他言论</span>
				</el-menu-item>
				<el-menu-item index="1-3" route="write" >
					<i class="el-icon-edit"></i>
					<span slot="title">撰写博客</span>
				</el-menu-item>
				<el-menu-item index="1-4">
					<i class="el-icon-setting"></i>
					<span slot="title">权限设置</span>
				</el-menu-item>
				</el-menu>
			</aside>
			<section class="content-container">

				<!-- 按钮 -->
				<el-button circle @click.prevent="collapse" class="isCollapse">
					<i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
				</el-button>
				<router-view></router-view>
			</section>
		</el-col>

	</el-container>
</template>

<script>

	export default {
		data() {
			return {
				activeIndex: '1-3',
				activeIndex2: '1',
				isCollapse: true
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				// console.log(key, keyPath);
				this.isCollapse = false;
				this.activeIndex = keyPath[keyPath.length-1];
			},
			handleOpen(key, keyPath) {
				// console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				// console.log(key, keyPath);
			},
			//折叠导航栏
			collapse: function() {
				this.isCollapse = !this.isCollapse;
			},
		},
	
	}
</script>

<style scoped="scoped" lang="scss">
	.el-container {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;

		.header {
			height: 60px;
			line-height: 60px;
			background: #545c64;
			color: #fff;

			.userinfo {
				text-align: right;
				padding-right: 20px;
				// float: right;

				.userinfo-inner {
					cursor: pointer;
					color: #fff;

					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0 10px 10px;
						// float: right;
					}
				}
			}

			// 
			.logo {
				// text-align: center;
				height: 60px;
				font-size: 22px;
				padding-left: 4%;
				// padding-right: 20px;
				border-color: rgba(238, 241, 146, 0.3);

				a {
					text-decoration: none;
					color: #D9D9D9;
					&:hover { color: #fff }
				}
				;

				.txt {
					color: #fff;
				}
			}

		}

		.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0;

			// overflow: hidden;
			// 
			aside {
				background: #545c64;
				.el-menu-vertical-demo:not(.el-menu--collapse) {
					width: 250px;
					min-height: 100%;
				}
				.el-menu--collapse {
						height: 100%;
				}
			}


			.content-container {
				flex: 1;
				// overflow-y: scroll;
				// padding: 20px 20px 20px 0px;
				position: relative;
				background-color: #d3d7d4;
				.isCollapse {
					position: absolute;
					top: 40%;
					left: -32px;
					color: #ccc;
					background: RGBA(89, 89, 89, 0.1);
					border-radius: 0 0px 0px 0;
					padding-left: 5px;
				}
			}
		}
	}
</style>

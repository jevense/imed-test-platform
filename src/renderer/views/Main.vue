<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu
                    :shrink="shrink"
                    :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <img v-show="!shrink" src="../assets/images/logo.png" key="max-logo"/>
                    <img v-show="shrink" src="../assets/images/logo-min.png" key="min-logo"/>
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                            @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="loginout">退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar icon="person" style="background: #619fe7;margin-left:10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <!--<div class="layout-breadcrumb">-->
                    <!--<Breadcrumb>-->
                        <!--<Breadcrumb-item href="#">首页</Breadcrumb-item>-->
                        <!--<Breadcrumb-item href="#">应用中心</Breadcrumb-item>-->
                        <!--<Breadcrumb-item>某应用</Breadcrumb-item>-->
                    <!--</Breadcrumb>-->
                <!--</div>-->
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    2018 &copy; MVWChina
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import Cookies from 'js-cookie';
    import ShrinkableMenu from './main-components/shrinkable-menu/ShrinkableMenu';

    export default {
        components: {
            ShrinkableMenu
        },
        data() {
            return {
                shrink: false,
                userName: ''
            };
        },
        created() {
            // if (!Cookies.get('user')) {
            //     this.$router.push({
            //         name: 'login'
            //     });
            // }
        },
        computed: {
            menuList() {
                return this.$store.state.app.menuList;
            }
        },
        methods: {
            init() {
                this.userName = Cookies.get('user');
            },
            toggleClick() {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown(name) {
                this.$router.push({
                    name: 'login'
                });
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
<style lang="less">
    @import "./main.less";

    .layout-breadcrumb {
        padding: 10px 15px 0;
    }

    .layout-content {
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }

    .layout-content-main {
        padding: 10px;
    }

    .layout-copy {
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
</style>

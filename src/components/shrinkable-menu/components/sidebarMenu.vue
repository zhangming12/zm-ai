<style lang="less">
    // @import '../styles/menu.less';
    .ivu-menu-light{
        height: calc(~'100% - 40px');
         overflow-y:auto;
    }
    .circle-icon{
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 100%;
        margin-right: 5px;
        background-color: #ff8a34;
    }
</style>

<template>
    <Menu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
            <!-- <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name">
                <Icon :type="item.children[0].icon || item.icon" :size="iconSize" :key="'menuicon' + item.name"></Icon>
                <span class="layout-text" :key="'title' + item.name">{{ itemTitle(item.children[0]) }}</span>
            </MenuItem> -->

            <Submenu v-for="(item,index) in menuList" :name="item.id" v-if="item.isHidden === 1" :key="item.id">
                <template slot="title" >
                    <Icon :type="item.resIcon" size="18"></Icon>
                    <!-- <Icon type="ios-easel" size="18"/> -->
                    {{ item.resName }}
                </template>
                <Menu-item :name="list.resPage" v-for="(list,num) in item.children" v-if="item.isHidden === 1" :key="list.id">
       
                    <span class="circle-icon"></span>
                    {{ list.resName }}
                </Menu-item>
            </Submenu>
    </Menu>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    methods: {
        changeMenu (active) {
            this.$emit('on-change', active);
        },
        itemTitle (item) {
            if (typeof item.title === 'object') {
                return this.$t(item.title.i18n);
            } else {
                return item.title;
            }
        }
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }

};
</script>

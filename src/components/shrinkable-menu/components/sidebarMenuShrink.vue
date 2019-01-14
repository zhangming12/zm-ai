<style scoped lang="less">
.left{
    height: calc(~'100% - 40px');
    overflow-y:auto;
}

.ivu-select-dropdown{
    max-height: 300px;
}
</style>


<template>
    <div class="left">
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;" :key="index">
                <Dropdown transfer placement="right-start" v-if="item.isHidden === 1" :key="index" @on-click="changeMenu">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <!-- <Icon :size="20" :color="iconColor" :type="item.resIcon"></Icon> -->
                        <Icon type="ios-easel" size="20"/>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <DropdownItem v-for="(list,num) in item.children" :key="num" v-if="item.isHidden === 1" :name="list.resPage" >
                            <!-- <Icon :type="item.resIcon"></Icon> -->
                            <Icon type="ios-easel"/>
                            <span style="padding-left:10px;">{{ list.resName }}</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'sidebarMenuShrink',
    props: {
        menuList: {
            type: Array
        },
        iconColor: {
            type: String,
            default: 'black'
        },
        menuTheme: {
            type: String,
            default: 'darck'
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
    }
};
</script>

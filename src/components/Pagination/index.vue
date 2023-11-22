<template>
    <div class="pagination">
        <!-- 左边部分 -->
        <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="stearNum.start>1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
        <button v-if="stearNum.start>2">···</button>
        <!-- 中间部分 -->
        <button v-for="page in stearNum.end" :key="page" v-if="page >= stearNum.start"  @click="$emit('getPageNo',page)" :class="{active:pageNo==page}">{{ page }}</button>
        <!-- 右边部分 -->
        <button v-if="stearNum.end<totalPage-1">···</button>
        <button v-if="stearNum.end<totalPage"  @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
        <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>
        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>

<script>
export default {
    name: "Pagination",
    props: ['pageNo', 'pageSize', 'total', 'continues',],
    computed: {
        //总页码数
        totalPage() {
         return Math.ceil(this.total / this.pageSize);
        },
        //计算连续的页码的起始和结束数字
        stearNum() {
            const { continues, pageNo, totalPage } = this;
            //初始化起始值与结束值
            let start = 0,
             end = 0;
            //若连续页码数大于总页码数（不正常现象）
            if (continues > totalPage) {
                start = 1;
                end = totalPage;
            } else {
                //正常情况
                start = pageNo - parseInt(continues / 2);
                end = pageNo + parseInt(continues / 2);
                //起始页不能小于1（不正常）
                if (start < 1) {
                    start = 1;
                    end = continues;
                }
                //结束页不能大于总页码数(不正常)
                if (end > totalPage) {
                    end = totalPage;
                    start = totalPage - continues + 1;
                }
            }
            return { start, end };
        }

    },
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #e45a1b;
            color: #fff;
        }
    }
}

</style>
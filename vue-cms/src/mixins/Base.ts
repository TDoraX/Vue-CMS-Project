import {Vue} from "vue/types/vue";

export const Base = {
    data() {
        return {
            module: 'users',
            modal1: false,
            listData: [],
            total: 0,
            page: 1,
            rows: 10,
            ids: [],
            name: ''
        };
    },
    methods: {
        ok(this: Vue) {
            this.$Message.info('Clicked ok');
        },
        cancel(this: Vue) {
            this.$Message.info('Clicked cancel');
        },
        handleSubmit(this: any, name: any) {
            this.$refs[name].validate((valid: any) => {
                if (valid) {
                    if (this.formValidate._id && this.formValidate._id.trim().length > 0) {
                        this.axios({
                            url: `http://localhost:3000/${this.module}/${this.formValidate._id}`,
                            method: 'put',
                            data: this.formValidate
                        }).then((res: any) => {
                            this.$Message.success('Data Modified!');
                            this.modal1 = false;
                            this.getData();
                            Object.assign(this.$data.formValidate, this.$options.data().formValidate);
                        });
                    } else {
                        this.axios({
                            url: `http://localhost:3000/${this.module}`,
                            method: 'post',
                            data: this.formValidate
                        }).then((res: any) => {
                            this.$Message.success('Data Added!');
                            this.modal1 = false;
                            this.getData();
                            Object.assign(this.$data.formValidate, this.$options.data().formValidate);

                        });
                    }
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset(this: any, name: any) {
            this.$refs[name].resetFields();
        },
        addData(this: any) {
            this.modal1 = true;
        },
        getData(this: any) {
            this.axios({
                url: `http://localhost:3000/${this.module}/list`,
                method: 'post',
                data: {
                    page: this.page,
                    rows: this.rows,
                    name: this.name,
                    newsId: this.formValidate.newsId
                }
            }).then((res: any) => {
                this.listData = res.data.rows;
                this.total = res.data.total;
            });
        },
        setData() {

        },
        searchData(this: any) {
            this.getData();
        },
        onChangePage(this: any, page: number) {
            this.page = page;
            this.getData();
        },
        onPageSizeChange(this: any, pageSize: number) {
            this.rows = pageSize;
            this.getData();
        },
        onSelectionChange(this: any, selection: any) {
            let selectionLen: number = selection.length;
            for (let i: number = 0; i < selectionLen; i++) {
                this.ids.push(selection[i]._id);
            }
        },
        editData(this: any, id: string) {
            this.axios({
                url: `http://localhost:3000/${this.module}/${id}`,
                method: 'get'
            }).then((res: any) => {
                this.formValidate = res.data;
                this.modal1 = true;
            });
        },
        removeData(this: any, id: string) {
            this.$Modal.confirm({
                title: 'Are you sure?',
                content: '<p>Delete item?</p>',
                onOk: () => {
                    this.axios({
                        url: `http://localhost:3000/${this.module}/${id}`,
                        method: 'delete'
                    }).then((res: any) => {
                        this.getData();
                        this.$Message.info('Deleted successfully');
                    });
                },
                onCancel: () => {
                    this.$Message.info('Canceled');
                }
            });
        },
        removesData(this: any) {
            this.$Modal.confirm({
                title: 'Are you sure?',
                content: '<p>Delete batch items?</p>',
                onOk: () => {
                    this.axios({
                        url: `http://localhost:3000/${this.module}/removes`,
                        method: 'post',
                        data: {
                            ids: this.ids.toString()
                        }
                    }).then((res: any) => {
                        this.getData();
                        this.$Message.info('Deleted successfully');
                    });
                },
                onCancel: () => {
                    this.$Message.info('Canceled');
                }
            });
        }
    },
    mounted(this: any) {
        this.getData();
    }
};
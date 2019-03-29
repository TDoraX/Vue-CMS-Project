<template>
    <div class="news">

        <Row>
            <Col span="4"><Tree :data="treeData" @on-select-change="onTreeSelectChange"></Tree></Col>
            <Col span="20">
                <Button type="primary" @click="addData">Add</Button>
                <Button type="error" @click="removesData">Delete</Button>
                <Input search v-model="name" @on-search="searchData" placeholder="Search by keywords..." />
                <Table :columns="columns" :data="listData" @on-selection-change="onSelectionChange"></Table>
                <Page :total="total" show-sizer @on-change="onChangePage" @on-page-size-change="onPageSizeChange" :page-size-opts="[5, 10, 20, 30, 40, 50]"/>
            </Col>
        </Row>
        <Modal v-model="modal1"
               title="Common Modal dialog box title"
               @on-ok="ok"
               @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="News ID" prop="newsId">
                    <Input v-model="formValidate.newsId"></Input>
                </FormItem>
                <FormItem label="Title" prop="title">
                    <Input v-model="formValidate.title" placeholder="Enter news title"></Input>
                </FormItem>
                <quill-editor v-model="formValidate.content" ref="myQuillEditor">
                </quill-editor>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Base } from '@/mixins/Base';

    export default Vue.extend( {
        mixins: [Base],
        data(): object {
            return {
                treeData: [],
                module: 'news',
                formValidate: {
                    newsId: null,
                    title: '',
                    content: ''
                },
                ruleValidate: {
                    title: [
                        {required: true, message: 'Title cannot be empty', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: 'Content cannot be empty', trigger: 'blur'},
                    ]
                },
                modal1: false,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Title',
                        key: 'title'
                    },
                    {
                        title: 'Comments',
                        key: 'commentCount'
                    },
                    {
                        title: 'Date',
                        key: 'date',
                        render: (h: any, params: any) => {
                            let time: string = this.$moment(params.row.date).format('YYYY-MM-DD');
                            return h('div', [
                                h('span', time)
                            ]);
                        }
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h: any, params: any) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editData(params.row._id);
                                        }
                                    }
                                }, 'Comment'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editData(params.row._id);
                                        }
                                    }
                                }, 'Modify'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.removeData(params.row._id);
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ]
            };
        },
        methods: {
            onTreeSelectChange(this: any, node: any): void {
                this.formValidate.newsId = node[0]._id;
                this.getData();
            },
            addData(this: any): void {
                if (this.formValidate.newsId === null) {
                    alert('Please choose a category');
                } else {
                    this.modal1 = true;
                }
            },
            getTreeData(this: any): void {
                this.axios({
                    url: `http://localhost:3000/cate/list/1`,
                    method: 'post'
                }).then((res: any) => {
                    this.treeData = res.data;
                });

            }
        },
        mounted(this: any): void {
            this.getTreeData();
        }
    })
</script>

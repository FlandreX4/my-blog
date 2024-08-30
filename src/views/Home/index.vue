<template>
    <div class="home">
        <PageHeader isFullScreen @pageDown="onPageDown">Flandre's Blog</PageHeader>
        <div class="main-container">
            <div class="main-container-left">
                <div class="article-item" v-for="item in 5" :key="item">
                    <div class="article-item-img">
                        <img src="@\assets\img\104678109_p1.jpg" alt="">
                    </div>
                    <div class="article-info">
                        <div class="article-meta">
                            <span>
                                <n-icon :component="CalendarOutline" />
                                2024-07-19
                            </span>
                            <span>
                                <n-icon :component="Pricetags" />
                                服务器部署
                            </span>
                        </div>
                        <div class="article-title">
                            疯狂踩坑，我终于是把nginx+frp疏通了！疯狂踩坑，我终于是把nginx+frp疏通了！
                        </div>
                        <div class="article-content">
                            前言最近服务器要到期了，又因为配置好点的服务器又太贵了，于是决定自己组一台服务器，然后通过frp做内网穿透但是途中遇见了一系列大坑，现在在这里给大家放出来，做借鉴！注：:::warning本章内容全部
                        </div>
                        <div class="article-category">
                            <span>
                                <n-icon :component="Flag" />
                                服务器部署
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-container-right">
                <div class="side-container">
                    <div class="side-card">
                        <div class="author-avatar">
                            <img src="@\assets\img\1206-baka.jpg" alt="">
                        </div>
                        <div class="author-name">Flandre Nya~</div>
                        <div class="site-desc">回头亦是绝路</div>
                        <div class="blog-container">
                            <span>文章</span>
                            <span>日志</span>
                            <span>关于页面</span>
                        </div>
                        <div class="social-container">
                            <a href="" target="_blank">
                                <svg t="1723445900333" class="icon" viewBox="0 0 1049 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="2291">
                                    <path
                                        d="M524.979332 0C234.676191 0 0 234.676191 0 524.979332c0 232.068678 150.366597 428.501342 358.967656 498.035028 26.075132 5.215026 35.636014-11.299224 35.636014-25.205961 0-12.168395-0.869171-53.888607-0.869171-97.347161-146.020741 31.290159-176.441729-62.580318-176.441729-62.580318-23.467619-60.841976-58.234462-76.487055-58.234463-76.487055-47.804409-32.15933 3.476684-32.15933 3.476685-32.15933 53.019436 3.476684 80.83291 53.888607 80.83291 53.888607 46.935238 79.963739 122.553122 57.365291 152.97411 43.458554 4.345855-33.897672 18.252593-57.365291 33.028501-70.402857-116.468925-12.168395-239.022047-57.365291-239.022047-259.012982 0-57.365291 20.860106-104.300529 53.888607-140.805715-5.215026-13.037566-23.467619-66.926173 5.215027-139.067372 0 0 44.327725-13.906737 144.282399 53.888607 41.720212-11.299224 86.917108-17.383422 131.244833-17.383422s89.524621 6.084198 131.244833 17.383422C756.178839 203.386032 800.506564 217.29277 800.506564 217.29277c28.682646 72.1412 10.430053 126.029806 5.215026 139.067372 33.897672 36.505185 53.888607 83.440424 53.888607 140.805715 0 201.64769-122.553122 245.975415-239.891218 259.012982 19.121764 16.514251 35.636014 47.804409 35.636015 97.347161 0 70.402857-0.869171 126.898978-0.869172 144.282399 0 13.906737 9.560882 30.420988 35.636015 25.205961 208.601059-69.533686 358.967656-265.96635 358.967655-498.035028C1049.958663 234.676191 814.413301 0 524.979332 0z"
                                        fill="#191717" p-id="2292"></path>
                                    <path
                                        d="M199.040177 753.571326c-0.869171 2.607513-5.215026 3.476684-8.691711 1.738342s-6.084198-5.215026-4.345855-7.82254c0.869171-2.607513 5.215026-3.476684 8.691711-1.738342s5.215026 5.215026 4.345855 7.82254z m-6.953369-4.345856M219.900283 777.038945c-2.607513 2.607513-7.82254 0.869171-10.430053-2.607514-3.476684-3.476684-4.345855-8.691711-1.738342-11.299224 2.607513-2.607513 6.953369-0.869171 10.430053 2.607514 3.476684 4.345855 4.345855 9.560882 1.738342 11.299224z m-5.215026-5.215027M240.760389 807.459932c-3.476684 2.607513-8.691711 0-11.299224-4.345855-3.476684-4.345855-3.476684-10.430053 0-12.168395 3.476684-2.607513 8.691711 0 11.299224 4.345855 3.476684 4.345855 3.476684 9.560882 0 12.168395z m0 0M269.443034 837.011749c-2.607513 3.476684-8.691711 2.607513-13.906737-1.738342-4.345855-4.345855-6.084198-10.430053-2.607513-13.037566 2.607513-3.476684 8.691711-2.607513 13.906737 1.738342 4.345855 3.476684 5.215026 9.560882 2.607513 13.037566z m0 0M308.555733 853.526c-0.869171 4.345855-6.953369 6.084198-13.037566 4.345855-6.084198-1.738342-9.560882-6.953369-8.691711-10.430053 0.869171-4.345855 6.953369-6.084198 13.037566-4.345855 6.084198 1.738342 9.560882 6.084198 8.691711 10.430053z m0 0M351.145116 857.002684c0 4.345855-5.215026 7.82254-11.299224 7.82254-6.084198 0-11.299224-3.476684-11.299224-7.82254s5.215026-7.82254 11.299224-7.82254c6.084198 0 11.299224 3.476684 11.299224 7.82254z m0 0M391.126986 850.049315c0.869171 4.345855-3.476684 8.691711-9.560882 9.560882-6.084198 0.869171-11.299224-1.738342-12.168395-6.084197-0.869171-4.345855 3.476684-8.691711 9.560881-9.560882 6.084198-0.869171 11.299224 1.738342 12.168396 6.084197z m0 0"
                                        fill="#191717" p-id="2293"></path>
                                </svg>
                            </a>
                            <a href="" target="_blank">
                                <svg t="1723446239434" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="12547">
                                    <path
                                        d="M512 1024C229.226667 1024 0 794.773333 0 512 0 229.226667 229.226667 0 512 0 794.773333 0 1024 229.226667 1024 512 1024 794.773333 794.773333 1024 512 1024ZM693.333333 458.666667C689.024 438.634667 682.666667 426.666667 682.666667 426.666667 682.666667 426.666667 682.944 397.333333 650.666667 330.666667 618.389333 264 522.666667 256 522.666667 256L512 256C512 256 416.277333 264 384 330.666667 351.722667 397.333333 352 426.666667 352 426.666667 352 426.666667 345.642667 438.634667 341.333333 458.666667 337.024 478.698667 341.333333 490.666667 341.333333 490.666667 341.333333 490.666667 286.656 546.421333 288 586.666667 289.344 626.912 299.221333 652.544 320 629.333333 340.778667 606.122667 341.333333 608 341.333333 608 341.333333 608 340.970667 625.333333 352 640 363.029333 654.666667 373.333333 661.333333 373.333333 661.333333 373.333333 661.333333 317.386667 689.034667 330.666667 725.333333 343.946667 761.632 384.874667 768.288 416 768 447.125333 767.712 512 746.666667 512 746.666667L522.666667 746.666667C522.666667 746.666667 587.541333 767.712 618.666667 768 649.792 768.288 690.72 761.632 704 725.333333 717.28 689.034667 661.333333 661.333333 661.333333 661.333333 661.333333 661.333333 671.637333 654.666667 682.666667 640 693.696 625.333333 693.333333 608 693.333333 608 693.333333 608 693.888 606.122667 714.666667 629.333333 735.445333 652.544 745.322667 626.912 746.666667 586.666667 748.010667 546.421333 693.333333 490.666667 693.333333 490.666667 693.333333 490.666667 697.642667 478.698667 693.333333 458.666667Z"
                                        fill="#1296db" p-id="12548"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div class="side-card notice">
                        <div class="notice-title">
                            <svg t="1723198647704" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="15134">
                                <path
                                    d="M512 892.586667v24.746666a21.333333 21.333333 0 0 1-21.333333 21.333334H408.32a42.666667 42.666667 0 0 1-36.693333-20.906667l-97.28-162.133333a116.053333 116.053333 0 0 1-15.36-42.666667h104.106666a176.64 176.64 0 0 1 66.986667 12.8l17.92 117.333333a42.666667 42.666667 0 0 0 32 24.32l14.08 2.56a21.333333 21.333333 0 0 1 17.92 22.613334zM938.666667 469.333333a170.666667 170.666667 0 0 1-34.133334 102.4 21.76 21.76 0 0 1-32 0l-30.72-30.72a21.333333 21.333333 0 0 1-2.56-26.88 85.333333 85.333333 0 0 0 0-93.866666 21.333333 21.333333 0 0 1 2.56-26.88l30.72-30.72a21.76 21.76 0 0 1 16.64-6.4 23.04 23.04 0 0 1 15.36 8.533333A170.666667 170.666667 0 0 1 938.666667 469.333333z m-170.666667-341.333333v682.666667a42.666667 42.666667 0 0 1-42.666667 42.666666h-25.173333a42.666667 42.666667 0 0 1-29.866667-12.373333l-128-125.866667A256 256 0 0 0 363.093333 640H213.333333a128 128 0 0 1-128-128v-85.333333a128 128 0 0 1 128-128h149.76a256 256 0 0 0 181.333334-75.093334l128-125.866666a42.666667 42.666667 0 0 1 29.866666-12.373334H725.333333a42.666667 42.666667 0 0 1 42.666667 42.666667z"
                                    p-id="15135" fill="#e9546b"></path>
                            </svg>
                            <span>公告</span>
                        </div>
                        <div class="notice-content">欢迎来到Flandre的博客~</div>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { CalendarOutline, Pricetags, Flag } from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';
import { onMounted, ref } from "vue";
import PageHeader from '@/components/PageHeader.vue'

onMounted(() => { });

let tempArr = [
    {
        key: 1,
        name: "flandre"
    },
    {
        key: 2,
        name: "remi"
    },
]

let dataList = ref(tempArr);

const onPageDown = () => {
    let ele = document.querySelector(".page-header");
    document.documentElement.scrollTo({ top: ele?.scrollHeight, behavior: "smooth" });
}


</script>

<style lang="less" scoped>
.home {
    width: 100%;
    // background-color: white;
}


.main-container {
    width: 1160px;
    margin: 0 auto;
    min-height: 500px;
    position: relative;
    z-index: 1;
    // background-color: aquamarine;
    display: flex;
    padding: 100px 0;
}

.main-container-left {
    flex: 1;
    margin-right: 20px;

    .article-item {
        display: flex;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 10px 30px -15px rgba(0, 0, 0, .1);
        transition: all .2s;
        background-color: #fff;

        &:hover {
            box-shadow: 0 0 24px rgba(0, 0, 0, .1);

            .article-item-img img {
                transform: scale(1.05) rotate(1deg);
            }
        }

        &:not(&:last-child) {
            margin-bottom: 20px;
        }
    }

    .article-item:nth-child(2n) {
        flex-direction: row-reverse;

        .article-item-img {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 8% 100%);
            margin-right: initial;
            margin-left: 25px;
        }

        .article-info {
            padding: 16px 0 48px 25px;
        }

        .article-meta {
            justify-content: flex-start;
        }

        .article-category {
            justify-content: flex-end;
        }
    }

    .article-item-img {
        width: 50%;
        margin-right: 25px;
        clip-path: polygon(0 0, 92% 0, 100% 100%, 0 100%);

        img {
            transition: all 0.2s;
        }
    }

    .article-info {
        padding: 16px 25px 48px 0;
        width: 50%;
        position: relative;
    }

    .article-meta {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #999;

        &>span:not(& > span:first-child) {
            margin-left: 15px;
        }
    }

    .article-title {
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: .625rem 0;
        color: #e9546b;
        overflow: hidden;
        font-weight: 700;
        font-size: 18px;
    }

    .article-content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        max-height: 80px;
        font-size: 14px;
        overflow: hidden;
    }

    .article-category {
        width: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        bottom: 8px;
        font-size: 13px;
        color: #999;
    }
}

.main-container-right {
    width: 290px;

}

.side-container {
    position: sticky;
    top: 90px;
    min-height: 300px;
    z-index: 1;
    background-color: #fff;
}

.side-card {
    width: 100%;
    // min-height: 320px;
    padding: 30px 16px;
    border-radius: 8px;
    box-shadow: 0 0 16px rgba(0, 0, 0, .1);
    transition: all .2s ease-in-out 0s;
    display: flex;
    flex-direction: column;
    align-items: center;

    .author-avatar {
        width: 100px;
        height: 100px;
        margin: 0 auto;

        img {
            width: 100%;
            height: 100%;
            // padding: 2px;
            border-radius: 50%;
            // box-shadow: 0 0 16px 10px #f7f7f7;
            // border: 1px solid #f7f7f7;
            box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
        }
    }

    .author-name {
        margin-top: 15px;
        font-weight: 400;
        text-align: center;
        color: #333;
    }

    .site-desc {
        margin-top: 10px;
        text-align: center;
        color: #999;
    }

    .blog-container {
        display: flex;
        justify-content: center;
        margin-top: 15px;
        line-height: 1.5;
        text-align: center;

        &>span {
            color: #666;
            padding: 0 11px;
            cursor: pointer;
        }

        &>span:not(& > span:first-child) {
            border-left: 1px solid #ccc;
        }
    }

    .social-container {
        margin-top: 15px;
        display: flex;

        svg {
            width: 22px;
            height: 22px;
        }

        &>a:not(& > a:last-child) {
            margin-right: 10px;
        }
    }
}

.side-card:not(:first-child) {
    margin-top: 20px;
}

.notice {
    align-items: initial;
}

.notice-title {
    display: flex;
    align-items: center;
    font-size: 19px;
    margin-bottom: 10px;

    svg {
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
}

.notice-content {
    font-size: 15px;
    line-height: 28px;
}
</style>

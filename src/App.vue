<template>

    <div class="wrapper">
        <!-- Sidebar Holder -->
        <!--
        <nav id="sidebar" v-if="hasnav">
            <div class="sidebar-header">
                <img width="210" src="./assets/img/LF-logo.jpg" />
                <h4 class="text-center">Sam Controller</h4>
            </div>

            <ul class="list-unstyled components">
            <p>Dummy Heading</p>
                <li>
                    <a href="/mcboard">Dashoard</a>
                </li>
                <li v-if="isAdmin">
                    <a data-bs-target="#machineSubmenu" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Machines </a>
                    <ul class="collapse list-unstyled" id="machineSubmenu">
                        <li>
                            <a href="/mclist">Machine List</a>
                        </li>
                        <li>
                            <a href="/mcadd">Add Machine</a>
                        </li>
                        <li>
                            <a href="/headstatus">Machine Status</a>
                        </li>
                    </ul>
                </li>
                <li v-if="isAdmin">
                    <a data-bs-target="#userSubmenu" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Users </a>
                    <ul class="collapse list-unstyled" id="userSubmenu">
                        <li>
                            <a href="/userslist">User List</a>
                        </li>
                        <li>
                            <a href="/uadd">Add User</a>
                        </li>
                    </ul>
                </li>
                <li v-if="isAdmin">
                    <a data-bs-target="#logSubmenu" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Logs </a>
                    <ul class="collapse list-unstyled" id="logSubmenu">
                        <li>
                            <a href="/loglist">Log List</a>
                        </li>
                    </ul>
                </li>
                <li v-if="isAdmin">
                    <a data-bs-target="#emailSubmenu" data-bs-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Settings </a>
                    <ul class="collapse list-unstyled" id="emailSubmenu">
                        <li>
                            <a href="/setting/1">Email Setting</a>
                        </li>
                    </ul>
                </li>
                <li v-if="isAdmin">
                    <a href="/srvr">Server</a>
                </li>
            </ul>

            <ul class="list-unstyled CTAs">
                <li>
                    <a @click="logout" href="#" class="download">Logout</a>
                </li>
            </ul>
        </nav>
         -->

        <!-- Page Content Holder -->
        <div id="content" class="p-0">
            <!--
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">

                    <button type="button" id="sidebarCollapse" class="navbar-btn">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-align-justify"></i>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="nav navbar-nav ml-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Page</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>-->

            <router-view />
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    //import HelloWorld from './components/HelloWorld.vue'
     export default {
        name: 'App',
        data: function () {
            return {
                hasnav: true,
                auth: {},
                isAdmin: true
            }
        },
        components: {
            //HelloWorld
        },
        created() {

        },
        mounted() {
            $(document).ready(function () {
                $('#sidebarCollapse').on('click', function () {
                    $('#sidebar').toggleClass('active');
                    $(this).toggleClass('active');
                });
            });

        },
        watch: {
            $route(to, from) {
                console.log(to);
                console.log(from);
                console.log(this.$route.name);
                if (this.$route.name == "Login") this.hasnav = false;
                else if (this.$route.name == "Home") this.hasnav = false;
                else if (this.$route.name == "ForgotCheck") this.hasnav = false;
                else if (this.$route.name == "ConfirmPass") this.hasnav = false;
                else this.hasnav = true;

                console.log('check this ' + this.$route.name);
                if (this.$route.name != "Login") {
                    this.checkUserType();
                }
            }
        },
        beforeRouteUpdate(to, from, next) {
            // called when the route that renders this component has changed,
            // but this component is reused in the new route.
            // For example, for a route with dynamic params /foo/:id, when we
            // navigate between /foo/1 and /foo/2, the same Foo component instance
            // will be reused, and this hook will be called when that happens.
            // has access to >this component instance.
            console.log(to)
            console.log(from)
            if (this.isProjectSaved) {
                next();
            }
            else {
                if (confirm('save Project?')) {
                    next();
                } else {
                    next(false);
                }
            }
        },
        methods: {
            // logout() {
            //     localStorage.token = null;
            //     sessionStorage.removeItem('role');
            //     sessionStorage.removeItem('name');
            //     localStorage.removeItem('role');
            //     localStorage.removeItem('name');
            //     this.$router.push({ name: 'Login' });
            // },

            checkUserType() {
                // let role = (sessionStorage.getItem('role') == null) ? localStorage.getItem('role') : sessionStorage.getItem('role');
                // console.log(role);
                // if (role == 'ENGINEER') {
                //     this.isAdmin = false;
                // } else {
                //     this.isAdmin = true;
                // }
                this.isAdmin = true;
            }
        }
    }
</script>

<style>

</style>

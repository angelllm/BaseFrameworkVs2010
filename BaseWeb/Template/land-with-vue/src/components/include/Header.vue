<template>
    <div class="box">
        <header class="header fixed">
            <div class="container clearfix">
                <hgroup>    
                    <span class="logo-text "><a class="pjax" href="/land/" title="纠结的狮子座"><i class="icon-logo"></i></a></span>
                </hgroup>
                <nav role="navigation" class="header-menu">     
                    <div class="header-menu-wrapper arrow-up-right">
                        <ul class="header-menu-list">
                            <li class="menu-item menu-item-type-post_type menu-item-object-page"><router-link to="/">Home</router-link></li>
                            <li class="menu-item menu-item-type-post_type menu-item-object-page"><router-link to="/About/">About</router-link></li>
                            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                                <a href="http://www.llmztt.com/vue2/#/" target="_blank">Version</a>
                                <div class="dropdown">
                                    <div class="dropdown-wrapper arrow-up-left" style="padding-left: 468.734px;">
                                        <ul class="sub-menu">
                                            <li class="menu-item menu-item-type-custom menu-item-object-custom">
                                                <a href="http://www.llmztt.com/vue2/#/" target="_blank">Vue2版本</a>
                                            </li>
                                            <li class="menu-item menu-item-type-custom menu-item-object-custom">
                                                <a href="http://www.llmztt.com/angular2/#/" target="_blank">Angular2版本</a>
                                            </li>
                                            <li class="menu-item menu-item-type-custom menu-item-object-custom">
                                                <a href="http://www.llmztt.com/react2/#/" target="_blank">React2版本</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li> 
                        </ul>
                    </div>      
                </nav>      
                <div class="member_login">
                    <div class="log-in-out dropel">
                        <a href="javascript:;"  @click="loginshow" data-bind="0" title="登录" class=' login-toggle icon-login tooltip'><i class="fa fa-user"></i></a>
                        <a href="javascript:;"  @click="loginout" title="双击退出登录" class=' hideall  login-toggle icon-login tooltip loginout'>
                            <img src="" class="uface" /><span class="uid"></span>
                        </a>
                        <div class="login_bg">
                            <div class="dropdown-wrapper arrow-up-left">
                                <form name="login-form" id="login-form" action="#" method="post">
                                    <p class="login-username">
                                        <label for="user_login">用户名</label>
                                        <input type="text" name="log" id="user_login" class="input" value="" size="20" />
                                    </p>
                                    <p class="login-password">
                                        <label for="user_pass">密码</label>
                                        <input type="password" name="pwd" id="user_pass" class="input" value="" size="20" />
                                    </p>
                                    <p class="login-submit">
                                        <input type="button" name="wp-submit" @click="login" id="wp-submit" class="button-primary" value="登录" />
                                    </p>
                                </form>
                                <p class="login-links clearfix">
                                    <span class="alignleft">
                                        <a href="#">忘记密码</a>
                                    </span>
                                    <span class="alignleft error" id="login-error"></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>      
                <!-- 搜索栏 -->    
                <div id="searchbox">
                    <div method="get" id="searchform" action='#' >
                        <input type="text" on-keypress="search" class="search-text" name="s" value="搜索..." onfocus="if (this.value == '搜索...') {this.value = '';}" onblur="if (this.value == '') {this.value = '搜索...';}"  />
                        <i class="fa fa-search"></i>
                    </div>
                    <a href="#" class="pjax hideall" id="from">show</a>
                </div>
                <a id="menu-toggle" href="javascript:void(0)" class="menu-toggle" @click="navigation"></a>
                <div class="clearfix"></div>
            </div>
        </header>
        <nav role="navigation"  :class="{'mobile-nav':true,show:isNavigation,hide:!isNavigation}">      
            <div class="">
                <ul id="" class="mobile-menu">
                    <li @click="nav" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                        <router-link to="/">Home</router-link>
                    </li>
                    <li @click="nav" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                        <router-link to="/list/">Artcile</router-link>
                    </li>
                    <li @click="nav" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                        <router-link to="/about/">About</router-link>
                    </li>
                    <li @click="nav" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                        <router-link to="/music/">Music</router-link>
                    </li>
                    
                </ul>
            </div>  
        </nav>
    </div>
</template>

<script>

export default {
  
  data() {
    return {
        isNavigation:false,
    }
  },
  components: {
    
  },
  
  methods: {
      loginshow:function(){

      },
      loginout:function(){

      },
      login:function(){

      },
      navigation:function(){
         this.isNavigation = !this.isNavigation
      },
      nav:function(){
         this.isNavigation = false
      } 
  }  
}
</script>

<style scoped type="less">
 .show{display: block!important;} 
 .hide{display: none!important;} 
</style>

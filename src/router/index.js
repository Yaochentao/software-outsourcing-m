import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login'
import engineer from '../components/engineer/engineer'
import projectE from '../components/project-e/project-e'
import team from '../components/team/team'
import newspaper from '../components/newspaper/newspaper'
import profile from '../components/profile/profile'
import projectListE from '../components/project-list-e/project-list-e'
import publisher from '../components/publisher/publisher'
import projectP from '../components/project-p/project-p'
import projectListP from '../components/project-list-p/project-list-p'
import projectN from '../components/project-n/project-n'
import projectInfo from '../components/project-info/project-info'
import signUp from '../components/sign-up/sign-up'
import projectListC from '../components/project-list-c/project-list-c'
import manager from '../components/manager/manager'
import attendance from '../components/attendance/attendance'
import audit from '../components/audit/audit'
import customer from '../components/customer/customer'
import projectListPG from '../components/project-list-p-g/project-list-p-g'
import power from '../components/power/power'
import projectC from '../components/project-c/project-c'
import forget from '../components/forget/forget'
import radar from '../components/radar/radar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login,
    },
    {
      path: '/radar',
      component: radar
    },
    {
      path: '/forget',
      component: forget,
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/sign-up',
      component: signUp
    },
    {
      path: '/customer',
      component: customer,
      redirect: '/customer/project-list-c',
      children: [
        {
          path: 'project-n',
          component: projectN
        },
        {
          path: 'project-list-c',
          component: projectListC
        },
        {
          path: 'project-c',
          component: projectC
        }
      ]
    },
    {
      path: '/manager',
      component: manager,
      redirect: '/manager/audit',
      children: [
        {
          path: 'audit',
          component: audit
        },{
          path: 'power',
          component: power
        }
      ]
    },
    {
      path: '/engineer',
      component: engineer,
      redirect: '/engineer/project-list-e',
      children:[  
        {
          path: 'project-list-e',
          component: projectListE,
        },

        {
          path: 'project-e',
          component: projectE,
        },
        {
          path: 'project-info',
          component: projectInfo
        },
        {
          path: 'team',
          name: 'team',
          component: team
        },
        {
          path: 'newspaper',
          name: 'newspaper',
          component: newspaper
        },
        {
          path: 'profile',
          name: 'profile',
          component: profile
        }
      ]
    },
    {
      path: '/publisher',
      redirect: '/publisher/project-list-p',
      component: publisher,
      children: [
        {
          path: 'project-list-p',
          component: projectListP,
        },
        {
          path: 'project-list-p-g',
          component: projectListPG
        },
        {
          path: 'project-p',
          component: projectP,
        },
        {
          path: 'newspaper',
          component: newspaper
        },
        {
          path: 'project-n',
          component: projectN
        },
        {
          path: 'project-c',
          component: projectC
        },
        {
          path: 'project-info',
          component: projectInfo
        },
        {
          path: 'profile',
          component: profile
        },
        {
          path: 'attendance',
          component: attendance
        },
        {
          path: 'team',
          component: team
        }
      ]
    }
    
  ]
})

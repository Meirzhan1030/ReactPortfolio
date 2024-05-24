import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import AdmHome from "./components/Hero/AdmHome.jsx";
import CreateHome from "./components/Hero/CreateHome.jsx";
import EditHome from "./components/Hero/EditHome.jsx";
import AdmProjects from "./components/Projects/ProjectCard/AdmProjects.jsx";
import CreateProject from "./components/Projects/ProjectCard/CreateProject.jsx";
import EditProject from "./components/Projects/ProjectCard/EditProject.jsx";
import AdmAbout from "./components/About/AdmAbout.jsx";
import CreateAbout from "./components/About/CreateAbout.jsx";
import EditAbout from "./components/About/EditAbout.jsx";
import AdmSkills from "./components/Skills/AdmSkills.jsx";
import CreateSkill from "./components/Skills/CreateSkill.jsx";
import EditSkill from "./components/Skills/EditSkill.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/users"/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/projects',
        element: <AdmProjects/>
      },
      {
        path: '/create/project',
        element: <CreateProject/>
      },
      {
        path: '/banner/post/:id',
        element: <EditProject/>
      },

      {
        path: '/about_me',
        element: <AdmAbout/>
      },
      {
        path: '/skills',
        element: <AdmSkills/>
      },
      {
        path: '/create/skill',
        element: <CreateSkill/>
      },
      {
        path: '/skill/edit/:id',
        element: <EditSkill/>
      },
      {
        path: '/create/about',
        element: <CreateAbout/>
      },
      {
        path: '/about/edit/:id',
        element: <EditAbout/>
      },

      {
        path: '/homepage',
        element: <AdmHome/>
      },
      {
        path: '/create/home',
        element: <CreateHome/>
      },
      {
        path: '/post/edit/:id',
        element: <EditHome/>
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;

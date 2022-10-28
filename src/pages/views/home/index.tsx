import Head from 'next/head'
import {Header} from 'src/client/components/Header'
import {FaHome, FaUserCheck, FaUserLock, FaUserPlus, FaUserTimes} from 'react-icons/fa'
import {gssp} from 'src/shared/utils/gssp.util'
import {Footer} from "../../../client/components/Footer";
import {Slider} from "../../../client/components/Slider";
import {FormInput} from "../../../client/components/FormInput";
import {Calendar} from "../../../client/components/Calendar";
import {Button} from "../../../client/components/Button";

export const getServerSideProps = gssp

interface HomePageProps {
  user: string
}

export default function Home({user}: HomePageProps) {
  return (
    <>
      <Header
        items={
          !user
            ? [
              {href: '/signin', label: 'Войти', icon: FaUserCheck},
              {href: '/signup', label: 'Регистрация', icon: FaUserPlus},
            ]
            : [
              {href: '/', label: 'Домашняя', icon: FaHome},
              {
                href: '/account',
                label: `Личный кабинет: ${user}`,
                icon: FaUserLock,
              },

              {href: '/signout', label: 'Выйти', icon: FaUserTimes},
            ]
        }
      />
      <Head>
        <title>OSL: Главная</title>
      </Head>
      <FormInput/>
      <Button/>
      <Calendar/>
      <Slider/>
      <Footer/>
    </>
  )
}

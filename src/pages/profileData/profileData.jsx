// import React, {useRef, useState} from 'react';
// import profileStyles from "../profile/profile.module.css";
// import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
// import {updateUserInformation} from "../../services/actions/registration";
// import {useDispatch, useSelector} from "react-redux";
//
// export function ProfileData() {
//     const user = useSelector(store => store.registration.user)
//     const dispatch = useDispatch();
//
//     const [nameProfile, setNameProfile] = useState(user.name);
//     const [loginProfile, setLoginProfile] = useState(user.email);
//     const [passwordProfile, setPasswordProfile] = useState('');
//
//     const nameRef = useRef(null);
//     const loginRef = useRef(null);
//
//     const nameClick  = () => {
//         setTimeout(() => nameRef.current.focus(), 0)
//     }
//
//     const loginClick  = () => {
//         setTimeout(() => loginRef.current.focus(), 0)
//     }
//
//     const inputName = (e) => {
//         setNameProfile(e.target.value);
//     };
//
//     const inputLogin = (e) => {
//         setLoginProfile(e.target.value);
//     };
//
//     const inputPassword = (e) => {
//         setPasswordProfile(e.target.value);
//     };
//
//     const saveSubmit = (e) => {
//         e.preventDefault();
//         dispatch(updateUserInformation(loginProfile, passwordProfile, nameProfile));
//     }
//
//     const cancelButton = (e) => {
//         e.preventDefault();
//         setNameProfile(user.name);
//         setLoginProfile(user.email);
//         setPasswordProfile('');
//     }
//
//     return (
//         <form className={profileStyles.form} onSubmit={saveSubmit}>
//             <div className={'mt-6 mb-6'}>
//                 <Input
//                     type='text'
//                     placeholder={'Имя'}
//                     onChange={inputName}
//                     onClick={nameClick}
//                     ref={nameRef}
//                     value={nameProfile}
//                     name={'name'}
//                     error={false}
//                     errorText={'Ошибка'}
//                     size={'default'}
//                     icon='EditIcon'
//                 />
//             </div>
//             <div className={'mb-6'}>
//                 <Input
//                     type='email'
//                     placeholder='Логин'
//                     onChange={inputLogin}
//                     onClick={loginClick}
//                     ref={loginRef}
//                     value={loginProfile}
//                     name='Login'
//                     error={false}
//                     errorText={'Ошибка'}
//                     size={'default'}
//                     icon='EditIcon'
//                 />
//             </div>
//             <div className={'mb-6'}>
//                 <PasswordInput
//                     name='password'
//                     value={passwordProfile}
//                     onChange={inputPassword}
//                     // onClick={passwordClick}
//                     // ref={passwordRef}
//                     icon='EditIcon'
//                     size='default'
//                     error={false}
//                     errorText='Ошибка'
//                     suggested='current-password'
//                 />
//             </div>
//             <div>
//                 <Button disabled={!(nameProfile && loginProfile && passwordProfile)} htmlType="submit" type="secondary" size="medium" onClick={cancelButton} >Отмена</Button>
//                 <Button disabled={!(nameProfile && loginProfile && passwordProfile)} htmlType="submit" type="primary" size="medium">Сохранить</Button>
//             </div>
//         </form>
//     )
// }
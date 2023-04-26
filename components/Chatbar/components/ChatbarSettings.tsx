import {IconFileExport, IconLogin, IconSettings} from '@tabler/icons-react';
import {useContext, useEffect, useState} from 'react';

import {useTranslation} from 'next-i18next';

import HomeContext from '@/pages/api/home/home.context';

import {SettingDialog} from '@/components/Settings/SettingDialog';

import {Import} from '../../Settings/Import';
import {Key} from '../../Settings/Key';
import {SidebarButton} from '../../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar.context';
import {ClearConversations} from './ClearConversations';
import {PluginKeys} from './PluginKeys';
import Sdk from "casdoor-js-sdk";
import getUserInfo from "@/pages/api/user_info";
import {UserinfoResponse} from "@/types/user";
import Image from "next/image";

export const ChatbarSettings = () => {
    const {t} = useTranslation('sidebar');
    const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<UserinfoResponse | null>(null);


    const {
        state: {
            apiKey,
            lightMode,
            serverSideApiKeyIsSet,
            serverSidePluginKeysSet,
            conversations,
        },
        dispatch: homeDispatch,
    } = useContext(HomeContext);

    const {
        handleClearConversations,
        handleImportConversations,
        handleExportData,
        handleApiKeyChange,
    } = useContext(ChatbarContext);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token != null) {
            setIsLogin(true)
            // 获取当前用户的信息

            getUserInfo().then((res) => {
                setUserInfo(res)
            });
            // TODO 获取当前用户的令牌


        }
        return () => {
            // 获取当前用户端的登录状态
        };
    }, []);

    function login() {
        const casdoor = new Sdk({
            serverUrl: 'https://uc.aikitbox.com',
            clientId: '88e8867e488bc4a52a3f',
            appName: 'aikitbox',
            organizationName: 'Hstudio',
            redirectPath: '/callback/sso',
        });

        casdoor.popupSignin("", "", (info) => {
            setIsLogin(false)
        });

        return
    }

    return (
        <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
            {
                isLogin ? (<>
                    <SidebarButton
                        text={userInfo?.name ?? ""}
                        icon={<img src={userInfo?.avatar ?? ""} width={20} height={20}/>}
                        onClick={() => {
                            // TODO 待做弹出框是否登出
                        }}
                    />
                </>) : (<>
                    <SidebarButton
                        text={t('Login')}
                        icon={<IconLogin size={18}/>}
                        onClick={() => login()}
                    />
                </>)
            }

            {conversations.length > 0 ? (
                <ClearConversations onClearConversations={handleClearConversations}/>
            ) : null}

            <Import onImport={handleImportConversations}/>

            <SidebarButton
                text={t('Export data')}
                icon={<IconFileExport size={18}/>}
                onClick={() => handleExportData()}
            />

            <SidebarButton
                text={t('Settings')}
                icon={<IconSettings size={18}/>}
                onClick={() => setIsSettingDialog(true)}
            />

            {!serverSideApiKeyIsSet ? (
                <Key apiKey={apiKey} onApiKeyChange={handleApiKeyChange}/>
            ) : null}

            {!serverSidePluginKeysSet ? <PluginKeys/> : null}

            <SettingDialog
                open={isSettingDialogOpen}
                onClose={() => {
                    setIsSettingDialog(false);
                }}
            />
        </div>
    );
};

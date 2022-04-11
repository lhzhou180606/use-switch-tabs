import React, { useEffect, useRef } from 'react';
import { Tabs, Dropdown, Menu } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import { MenuProps } from 'antd/lib/menu';
import * as H from 'history-with-query';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import _get from 'lodash/get';
import { history, useLocation } from '@vitjs/runtime';

import useSwitchTabs, { UseSwitchTabsOptions, ActionType } from '../../../../src';

enum CloseTabKey {
  Current = 'current',
  Others = 'others',
  ToRight = 'toRight',
}

export interface RouteTab {
  /** tab's title */
  tab: React.ReactNode;
  key: string;
  content: JSX.Element;
  closable?: boolean;
  /** used to extends tab's properties */
  location: Omit<H.Location, 'key'>;
}

export interface RouteTabsProps
  extends Omit<UseSwitchTabsOptions, 'location' | 'history'>,
    Omit<TabsProps, 'hideAdd' | 'activeKey' | 'onEdit' | 'onChange' | 'children'> {
  fixed?: boolean;
}

export default function SwitchTabs(props: RouteTabsProps): JSX.Element {
  const { mode, fixed, originalRoutes, setTabName, persistent, children, ...rest } = props;

  const location = useLocation();
  const actionRef = useRef<ActionType>();

  const { tabs, activeKey, handleSwitch, handleRemove, handleRemoveOthers, handleRemoveRightTabs } = useSwitchTabs({
    children,
    originalRoutes,
    mode,
    persistent,
    location,
    history,
    actionRef,
    setTabName,
  });

  const remove = useMemoizedFn((key: string) => {
    handleRemove(key);
  });

  const handleTabEdit = useMemoizedFn((targetKey: string, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey);
    }
  });

  const handleTabsMenuClick = useMemoizedFn((tabKey: string): MenuProps['onClick'] => (event) => {
    const { key, domEvent } = event;
    domEvent.stopPropagation();

    if (key === CloseTabKey.Current) {
      handleRemove(tabKey);
    } else if (key === CloseTabKey.Others) {
      handleRemoveOthers(tabKey);
    } else if (key === CloseTabKey.ToRight) {
      handleRemoveRightTabs(tabKey);
    }
  });

  const setMenu = useMemoizedFn((key: string, index: number) => (
    <Menu onClick={handleTabsMenuClick(key)}>
      <Menu.Item disabled={tabs.length === 1} key={CloseTabKey.Current}>
        closeCurrent
      </Menu.Item>
      <Menu.Item disabled={tabs.length === 1} key={CloseTabKey.Others}>
        closeOthers
      </Menu.Item>
      <Menu.Item disabled={tabs.length === index + 1} key={CloseTabKey.ToRight}>
        closeToRight
      </Menu.Item>
    </Menu>
  ));

  const setTab = useMemoizedFn((tab: React.ReactNode, key: string, index: number) => (
    <span onContextMenu={(event) => event.preventDefault()}>
      <Dropdown overlay={setMenu(key, index)} trigger={['contextMenu']}>
        <span>{tab}</span>
      </Dropdown>
    </span>
  ));

  useEffect(() => {
    window.tabsAction = actionRef.current!;
  }, [actionRef.current]);

  return (
    <Tabs
      tabPosition='top'
      type='editable-card'
      tabBarStyle={{ margin: 0 }}
      tabBarGutter={0}
      animated
      className={classNames('route-tabs', { 'page-tabs-fixed': fixed })}
      {...rest}
      hideAdd
      activeKey={activeKey}
      onEdit={handleTabEdit as TabsProps['onEdit']}
      onChange={handleSwitch}
    >
      {tabs.map((item, index) => (
        <Tabs.TabPane
          tab={setTab(item.title, item.key, index)}
          key={item.key}
          closable={item.closable}
          forceRender={_get(persistent, 'force', false)}
        >
          {item.content}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}

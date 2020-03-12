import React from 'react';
import { Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, Icon, Button, Box } from '@chakra-ui/core';

const SettingsIcon = () => <Icon name="settings" size="24px" aria-label="設定" color="teal.400" />;

export default () => {
  return (
    <Box color="black">
      <Menu isOpen={true}>
        <MenuButton as={Button}>
          <SettingsIcon />
        </MenuButton>
        <MenuList>
          <MenuGroup title="情報の再設定">
            <MenuItem>成績の修正</MenuItem>
            <MenuItem>志望の修正</MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem>利用規約</MenuItem>
          <MenuDivider />
          <MenuItem>ログアウト</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

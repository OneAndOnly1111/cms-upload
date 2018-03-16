/*
const menuData = [{
  name: 'dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: '监控页',
    path: 'monitor',
  }, {
    name: '分析页',
    path: 'analysis',
    hideInMenu: true,
  }, {
    name: '工作台',
    path: 'workplace',
    hideInMenu: true,
  }],
}, {
  name: '访问控制',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: '用户管理',
    path: 'management',
  }],
}, {
  name: '使用文档',
  icon: 'book',
  path: 'https://github.com/cloudtropy/dashboard/blob/master/README.md',
  target: '_blank',
}];
*/
const menuData = [{
  name: '视频上传',
  icon: 'upload',
  path: 'videoUpload',
}, {
  name: '我的视频',
  icon: 'video-camera',
  path: 'uploadList',
}, {
  name: '已发布列表',
  icon: 'profile',
  path: 'publishList',
}];



function formatter(data, parentPath = '', parentAuthority) {
  return data.map((item) => {
    const result = {
      ...item,
      path: `${parentPath}${item.path}`,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
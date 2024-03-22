import toast from 'solid-toast';

//<Toaster/> 放在 RouteGuard.jsx

const addAlertNotify = () => toast.error('請選擇 mood, size, sugar, ice',{
  duration: 2000,
  position: 'top-center',    
});

const addSuccesstNotify = () => toast.success('加入成功',{
  duration: 2000,
  position: 'top-center',    
});

const editSuccessNotify = ()=>toast.success('已修改成功!',{
  duration: 2000,
  position: 'top-center',

});

const deleteNotify = ()=>toast.success('已刪除!',{
  duration: 2000,
  position: 'top-center',

});

export { addAlertNotify, addSuccesstNotify ,editSuccessNotify,deleteNotify};
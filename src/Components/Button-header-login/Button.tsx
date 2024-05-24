import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import './buttonHeader.scss'; // Import the SCSS file
import { NavLink } from 'react-router-dom';

type TProps = {
  children: JSX.Element;
};

const ButtonHeader: React.FC<TProps> = ({ children }: TProps) => {
  const [modal1Open, setModal1Open] = useState(false);
  return (
    <>
      <Button
        className="button-header" // Add the class name to apply SCSS styles
        type="default"
        onClick={() => setModal1Open(true)}
      >
        {children}
      </Button>
      <Modal
        maskStyle={{ backgroundColor: 'unset' }}
        closable={false}
        style={{ top: 70, right: '-29%', padding: 0 }}
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        footer={null}
      >
        <div className="modal-content-header">
          <NavLink to={'/auth/login'}>Đăng nhập</NavLink>
          <NavLink to={'/auth/register'}>Đăng ký</NavLink>
        </div>
        <div className="modal-content-footer">
          <a href="#" className="help-btn">Trợ Giúp</a>
        </div>
      </Modal>
    </>
  );
};

export default ButtonHeader;

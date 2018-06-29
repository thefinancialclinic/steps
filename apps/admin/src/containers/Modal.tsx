import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideModal } from 'actions/modals';
import Modal, { ModalSize } from 'components/Modal';
import React from 'react';

interface Props {
  id: string;
  visibleModalId: string;
  actions: { hideModal };
  size: ModalSize;
  noPadding: boolean;
}

const ModalContainer: React.SFC<Props> = ({
  visibleModalId,
  id,
  children,
  actions,
  size,
  noPadding,
}) => {
  if (visibleModalId !== id) {
    return null;
  }
  return (
    <Modal
      size={size}
      noPadding={noPadding}
      onClose={() => actions.hideModal(id)}
    >
      {children}
    </Modal>
  );
};

const mapStateToProps = ({ modals }) => {
  return {
    visibleModalId: modals.visibleModalId,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ hideModal }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalContainer);

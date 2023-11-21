<Modal
  show={addShow}
  onHide={handleAddClose}
  backdrop="static"
  keyboard={false}
>
  <Modal.Header closeButton>
    <Modal.Title>Add Unit</Modal.Title>
  </Modal.Header>

  {errorMsg ? <div className="alert alert-danger p-2">{errorMsg}</div> : ''}
  <Modal.Body>
    <form onSubmit={submitFormData}>
      {/* Form content */}
    </form>

    {addMsg ? <div className="alert alert-danger m-3 p-2">{addMsg}</div> : ''}
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={handleAddClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
<Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="Name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Purpose</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Purpose"
                name="Purpose"
                
              />
            </Form.Group>



            <Form.Group controlId="projectDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                name="Description"
                rows={8}
                
              />
              
            </Form.Group>

            

            <Modal.Footer>
            <Button type="button" onClick={()=>props.onHide()}>Cancel</Button>
             <Button type="submit">Upload</Button>
            </Modal.Footer>
          </Form>

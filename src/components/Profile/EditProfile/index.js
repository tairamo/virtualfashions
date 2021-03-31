import { Upload } from "../../common";
import Header from "../../Header";
import {
  Container,
  Title,
  MainContent,
  Form,
  FormItem,
  Input,
  Textarea,
  InputPrepend,
} from "./styles";

const EditProfile = () => {
  return (
    <div style={{ backgroundColor: "rgb(242, 242, 242)" }}>
      <Header />
      <Container>
        <Title>Edit your Profile</Title>
        <MainContent>
          <div>
            <Form>
              <div>
                <FormItem>
                  <div></div>
                  <div>
                    <div>
                      <h2 className="form-item--header">Edit your details</h2>
                    </div>
                    <div className="form-item--content">
                      <Input>
                        <div>Name:</div>
                        <input name="name" placeholder="Name" />
                      </Input>
                      <InputPrepend>
                        <div>@</div>
                        <Input>
                          <div>Username:</div>
                          <input name="username" placeholder="Username" />
                        </Input>
                      </InputPrepend>
                    </div>
                  </div>
                </FormItem>
                <FormItem>
                  <div></div>
                  <div>
                    <div>
                      <h2 className="form-item--header">
                        Receive email notifications
                      </h2>
                      <div className="form-item--header-dt">
                        Add your email address to receive notifications about
                        your activity on Foundation. This will not be shown on
                        your profile.
                      </div>
                    </div>
                    <div className="form-item--content">
                      <Input>
                        <div>Email:</div>
                        <input name="email" placeholder="Email" />
                      </Input>
                    </div>
                  </div>
                </FormItem>
                <FormItem>
                  <div></div>
                  <div>
                    <div>
                      <h2 className="form-item--header">Add short bio.</h2>
                    </div>
                    <div className="form-item--content">
                      <Textarea
                        name="bio"
                        rows="10"
                        placeholder="Enter a short bio"
                      />
                    </div>
                  </div>
                </FormItem>
                <FormItem>
                  <div></div>
                  <div>
                    <div>
                      <h2 className="form-item--header">
                        Upload a profile image.
                      </h2>
                      <div className="form-item--header-dt">
                        Recommended size: 1000x1000px. JPG, PNG or GIF. 10MB max
                        size.
                      </div>
                    </div>
                    <div className="form-item--content">
                      <Upload />
                    </div>
                  </div>
                </FormItem>
                <FormItem>
                  <div></div>
                  <div>
                    <div>
                      <h2 className="form-item--header">
                        Upload a cover image
                      </h2>
                      <div className="form-item--header-dt">
                        Recommended size: 1500x500px. JPG, PNG or GIF. 10MB max
                        size.
                      </div>
                    </div>
                    <div className="form-item--content">
                      <Upload />
                    </div>
                  </div>
                </FormItem>
              </div>
              <div></div>
            </Form>
          </div>
        </MainContent>
      </Container>
    </div>
  );
};

export default EditProfile;

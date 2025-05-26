import "./About.scss";

function About() {
  return (
    <div className="formthree ptb-100 justify-content-center">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="sr-only">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required={true}
                      id="nameSix"
                      placeholder="Your Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="sr-only">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      required={true}
                      id="emailSix"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="sr-only">Message</label>
                <textarea
                  className="form-control"
                  required={true}
                  rows={7}
                  placeholder="Write Message"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

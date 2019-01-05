import { faHeart, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Level, Media, Modal } from "src/components";
import { ModalProps } from "src/components/modal/modal";
import { Box, Button, Content, Delete, Icon, Image, Title } from "src/elements";
import { Section } from "src/layout";
import { Omit } from "src/types";

interface OpenModalProps {
  modalProps: Omit<ModalProps, "onClose" | "active">;
  children: React.ReactNode;
}

interface OpenModalState {
  active: boolean;
}

class OpenModal extends React.Component<OpenModalProps, OpenModalState> {
  public static defaultProps = {
    modalProps: {},
  };

  public readonly state: OpenModalState = { active: false };

  public render() {
    return (
      <div>
        <Button onClick={this.open}>Open</Button>
        <Modal
          active={this.state.active}
          onClose={this.close}
          {...this.props.modalProps}
        >
          {this.props.children}
        </Modal>
      </div>
    );
  }

  private readonly close = () => {
    this.setState({ active: false });
  }
  private readonly open = () => {
    this.setState({ active: true });
  }
}

export const knobs = {
  closeOnBlur: (title: string = "Close on Blur") => boolean(title, true),
  closeOnEsc: (title: string = "Close on ESC") => boolean(title, true),
};

storiesOf("Components/Modal", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const props = {
      closeOnBlur: knobs.closeOnBlur(),
      closeOnEsc: knobs.closeOnEsc(),
    };

    return (
      <OpenModal modalProps={props}>
        <Modal.Background />
        <Modal.Content>
          <Box>
            <Media>
              <Media.Item as="figure" position="left">
                <Image.Container as="p" size={64}>
                  <Image
                    alt="64x64"
                    src="https://bulma.io/images/placeholders/128x128.png"
                  />
                </Image.Container>
              </Media.Item>
              <Media.Item>
                <Content>
                  <p>
                    <strong>John Smith</strong> <small>@johnsmith</small>{" "}
                    <small>31m</small>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean efficitur sit amet massa fringilla egestas. Nullam
                    condimentum luctus turpis.
                  </p>
                </Content>
                <Level breakpoint="mobile">
                  <Level.Left>
                    <Level.Item as="a">
                      <Icon size="small">
                        <FontAwesomeIcon icon={faRetweet} />
                      </Icon>
                    </Level.Item>
                    <Level.Item as="a">
                      <Icon size="small">
                        <FontAwesomeIcon icon={faHeart} />
                      </Icon>
                    </Level.Item>
                  </Level.Left>
                </Level>
              </Media.Item>
            </Media>
          </Box>
        </Modal.Content>
        <Modal.Close />
      </OpenModal>
    );
  })
  .add("Image", () => {
    const props = {
      closeOnBlur: knobs.closeOnBlur(),
      closeOnEsc: knobs.closeOnEsc(),
    };

    return (
      <OpenModal modalProps={props}>
        <Modal.Background />
        <Modal.Content>
          <Image.Container as="p" size="4by3">
            <Image src="https://bulma.io/images/placeholders/1280x960.png" />
          </Image.Container>
        </Modal.Content>
        <Modal.Close />
      </OpenModal>
    );
  })
  // tslint:disable-next-line: max-func-body-length
  .add("Card", () => {
    const props = {
      closeOnBlur: knobs.closeOnBlur(),
      closeOnEsc: knobs.closeOnEsc(),
    };

    return (
      <OpenModal modalProps={props}>
        <Modal.Background />
        <Modal.Card>
          <Modal.Card.Head>
            <Modal.Card.Title>Modal Title</Modal.Card.Title>
            <Delete />
          </Modal.Card.Head>
          <Modal.Card.Body>
            <Content>
              <Title>Hello world</Title>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                accumsan, metus ultrices eleifend gravida, nulla nunc varius
                lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper
                dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis
                neque.
              </p>
              <Title as="h2">Second level</Title>
              <p>
                Curabitur accumsan turpis pharetra{" "}
                <strong>augue tincidunt</strong> blandit. Quisque condimentum
                maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna
                vel cursus venenatis. Suspendisse potenti. Etiam mattis sem
                rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et
                neque nisl.
              </p>
              <ul>
                <li>
                  In fermentum leo eu lectus mollis, quis dictum mi aliquet.
                </li>
                <li>
                  Morbi eu nulla lobortis, lobortis est in, fringilla felis.
                </li>
                <li>
                  Aliquam nec felis in sapien venenatis viverra fermentum nec
                  lectus.
                </li>
                <li>Ut non enim metus.</li>
              </ul>
              <Title as="h3">Third level</Title>
              <p>
                Quisque ante lacus, malesuada ac auctor vitae, congue{" "}
                <a href="#non-ante">non ante</a>. Phasellus lacus ex, semper ac
                tortor nec, fringilla condimentum orci. Fusce eu rutrum tellus.
              </p>
              <Content.OrderedList>
                <Content.OrderedList.Item>
                  Donec blandit a lorem id convallis.
                </Content.OrderedList.Item>
                <Content.OrderedList.Item>
                  Cras gravida arcu at diam gravida gravida.
                </Content.OrderedList.Item>
                <Content.OrderedList.Item>
                  Integer in volutpat libero.
                </Content.OrderedList.Item>
                <Content.OrderedList.Item>
                  Donec a diam tellus.
                </Content.OrderedList.Item>
                <Content.OrderedList.Item>
                  Aenean nec tortor orci.
                </Content.OrderedList.Item>
                <Content.OrderedList.Item>
                  Quisque aliquam cursus urna, non bibendum massa viverra eget.
                </Content.OrderedList.Item>
                <Content.OrderedList.Item>
                  Vivamus maximus ultricies pulvinar.
                </Content.OrderedList.Item>
              </Content.OrderedList>
              <blockquote>
                Ut venenatis, nisl scelerisque sollicitudin fermentum, quam
                libero hendrerit ipsum, ut blandit est tellus sit amet turpis.
              </blockquote>
              <p>
                Quisque at semper enim, eu hendrerit odio. Etiam auctor nisl et{" "}
                <em>justo sodales</em> elementum. Maecenas ultrices lacus quis
                neque consectetur, et lobortis nisi molestie.
              </p>
              <p>
                Sed sagittis enim ac tortor maximus rutrum. Nulla facilisi.
                Donec mattis vulputate risus in luctus. Maecenas vestibulum
                interdum commodo.
              </p>
              <p>
                Suspendisse egestas sapien non felis placerat elementum. Morbi
                tortor nisl, suscipit sed mi sit amet, mollis malesuada nulla.
                Nulla facilisi. Nullam ac erat ante.
              </p>
              <Title as="h4">Fourth level</Title>
              <p>
                Nulla efficitur eleifend nisi, sit amet bibendum sapien
                fringilla ac. Mauris euismod metus a tellus laoreet, at
                elementum ex efficitur.
              </p>
              <p>
                Maecenas eleifend sollicitudin dui, faucibus sollicitudin augue
                cursus non. Ut finibus eleifend arcu ut vehicula. Mauris eu est
                maximus est porta condimentum in eu justo. Nulla id iaculis
                sapien.
              </p>
              <p>
                Phasellus porttitor enim id metus volutpat ultricies. Ut nisi
                nunc, blandit sed dapibus at, vestibulum in felis. Etiam iaculis
                lorem ac nibh bibendum rhoncus. Nam interdum efficitur ligula
                sit amet ullamcorper. Etiam tristique, leo vitae porta faucibus,
                mi lacus laoreet metus, at cursus leo est vel tellus. Sed ac
                posuere est. Nunc ultricies nunc neque, vitae ultricies ex
                sodales quis. Aliquam eu nibh in libero accumsan pulvinar.
                Nullam nec nisl placerat, pretium metus vel, euismod ipsum.
                Proin tempor cursus nisl vel condimentum. Nam pharetra varius
                metus non pellentesque.
              </p>
              <Title as="h5">Fifth level</Title>
              <p>
                Aliquam sagittis rhoncus vulputate. Cras non luctus sem, sed
                tincidunt ligula. Vestibulum at nunc elit. Praesent aliquet
                ligula mi, in luctus elit volutpat porta. Phasellus molestie
                diam vel nisi sodales, a eleifend augue laoreet. Sed nec
                eleifend justo. Nam et sollicitudin odio.
              </p>
              <Title as="h6">Sixth level</Title>
              <p>
                Cras in nibh lacinia, venenatis nisi et, auctor urna. Donec
                pulvinar lacus sed diam dignissim, ut eleifend eros accumsan.
                Phasellus non tortor eros. Ut sed rutrum lacus. Etiam purus
                nunc, scelerisque quis enim vitae, malesuada ultrices turpis.
                Nunc vitae maximus purus, nec consectetur dui. Suspendisse
                euismod, elit vel rutrum commodo, ipsum tortor maximus dui, sed
                varius sapien odio vitae est. Etiam at cursus metus.
              </p>
            </Content>
          </Modal.Card.Body>
          <Modal.Card.Foot>
            <Button color="success">Save changes</Button>
            <Button>Cancel</Button>
          </Modal.Card.Foot>
        </Modal.Card>
      </OpenModal>
    );
  });

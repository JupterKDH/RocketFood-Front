import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";

import { RiArrowDownSLine } from "react-icons/ri";
import { RxCaretLeft } from "react-icons/rx";
import { FiUpload } from "react-icons/fi";

import { api } from '../../services/api';

import { Container, Form, Image, Category } from "./styles";

import { ButtonText } from "../../components/ButtonText";
import { FoodItems } from '../../components/FoodItems';
import { Textarea } from '../../components/Textarea';
import { Section } from '../../components/Section';
import { Header } from '../../components/Header';
import { Button } from "../../components/Button";
import { Footer } from '../../components/Footer';
import { Input } from '../../components/Input';
import { Menu } from "../../components/Menu";

export function New({ isAdmin }) {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState(null);

  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    setFileName(file.name);
  }

  function handleAddTag() {
    setTags((prevState) => [...prevState, newTag]);
    setNewTag("");
  }

  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tag) => tag !== deleted));
  }

  async function handleNewDish() {
    if (!image) {
      return alert("Selecione uma imagem do prato.");
    }

    if (!name) {
      return alert("Digite o nome do prato.");
    }

    if (!category) {
      return alert("Selecione a categoria do prato.");
    }

    if (tags.length === 0) {
      return alert("Informe pelo menos um ingrediente do prato.");
    }

    if (newTag) {
      return alert(
        "Você deixou um ingrediente no campo para adicionar, mas não adicionou. Aperte para adicionar ou deixe o campo vazio."
      );
    }

    if (!price) {
      return alert("Coloque o preço do prato.");
    }

    if (!description) {
      return alert("Coloque a descrição do prato.");
    }
    
		const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);

    formData.append("ingredients", JSON.stringify(tags));

    try {
      await api.post("/dishes", formData);
      alert("Prato cadastrado com sucesso!");
      navigate(-1);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível cadastrar o prato.");
      }
    } 
	}

  return (
    <Container>
      {!isDesktop && 
        <Menu 
          isAdmin={isAdmin} 
          isDisabled={true} 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
        />
      }

      <Header 
        isAdmin={isAdmin} 
        isDisabled={true} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      <main>
        <Form>
          <header>
            <ButtonText onClick={handleBack}>
              <RxCaretLeft />
              voltar
            </ButtonText>

            <h1>Adicionar prato</h1>
          </header>

          <div>
            <Section title="Imagem do prato">
              <Image className="image">
                <label htmlFor="image">
                  <FiUpload size={"2.4rem"} />
                  <span>{fileName || "Selecione imagem"}</span>

                  <input 
                    id="image" 
                    type="file"
                    onChange={handleImageChange}
                  />
                </label>
              </Image>
            </Section>

            <Section title="Nome">
              <Input className="name"
                placeholder="Ex.: Salada Ceasar"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Section>

            <Section title="Categoria">
              <Category className="category">
                <label htmlFor="category">
                  <select 
                    id="category" 
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value="">Selecionar</option>
                    <option value="meal">Refeição</option>
                    <option value="dessert">Sobremesa</option>
                    <option value="beverage">Bebida</option>
                  </select>

                  <RiArrowDownSLine size={"2.4rem"} />
                </label>
              </Category>
            </Section>
          </div>

          <div>
            <Section title="Ingredientes">
              <div className="tags">
                {
                  tags.map((tag, index) => (
                    <FoodItems
                      key={String(index)}
                      value={tag}
                      onClick={() => handleRemoveTag(tag)}
                    />
                  ))
                }

                <FoodItems
                  isNew
                  placeholder="Adicionar"
                  onChange={(e) => setNewTag(e.target.value)}
                  value={newTag}
                  onClick={handleAddTag}
                />
              </div>
            </Section>

            <Section title="Preço">
              <Input className="price"
                placeholder="R$ 00,00" 
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </Section>
          </div>

          <Section title="Descrição">
            <Textarea 
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Section>

          <div className="save">
            <Button
              title="Salvar alterações"
              onClick={handleNewDish}
            />
          </div>
        </Form>
      </main>
      
      <Footer />
    </Container>
  );
}
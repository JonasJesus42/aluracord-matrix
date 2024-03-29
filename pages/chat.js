import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';


export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setMensagem] = useState('')
    const [listaDeMensagem, setListaDeMensagem] = useState([])


    function handleNovaMensagem(novaMensagem){
        const mensagem = {
            texto: novaMensagem,
            de: 'jonas',
            id: listaDeMensagem.length
        }
        setListaDeMensagem([
            mensagem,
            ...listaDeMensagem,
        ])
        setMensagem('')
    }
    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList mensagens={listaDeMensagem} setlist={setListaDeMensagem}/>

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        
                        <TextField
                            value={mensagem}
                            onChange={(e) => {
                                const valor = e.target.value
                                setMensagem(valor)
                            }}
                            onKeyPress={(e) =>{
                                if(e.key === 'Enter'){
                                    e.preventDefault()
                                    if(mensagem != ''){
                                        handleNovaMensagem(mensagem)
                                    }
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log('MessageList', props.mensagens);

    function apagarMensagem(id){
      const lista = props.mensagens.filter((mensagem) => mensagem.id != id)
      props.setlist(lista)
      
    }

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) =>{
                return(
                    <Text
                    key={mensagem.id}
                    tag="li"
                    styleSheet={{
                        borderRadius: '5px',
                        padding: '6px',
                        marginBottom: '12px',
                        hover: {
                            backgroundColor: appConfig.theme.colors.neutrals[700],
                        }
                    }}
                >
                    <Box
                        styleSheet={{
                            marginBottom: '8px',
                            display: 'flex',
                            justifyContent:'space-between'

                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display: 'flex',
                                justifyContent:'space-between'
    
                            }}
                        >
                        
                        <Image
                            styleSheet={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                            }}
                            src={`https://github.com/jonasjesus42.png`}
                            />
                        <Text tag="strong">
                            {mensagem.de}
                        </Text>
                        <Text
                            styleSheet={{
                                fontSize: '10px',
                                marginLeft: '8px',
                                color: appConfig.theme.colors.neutrals[300],
                            }}
                            tag="span"
                            >
                            {(new Date().toLocaleDateString())}
                        </Text>

                        </Box>
                        <Button iconName="FaTrash" 
                            onClick={() => {apagarMensagem(mensagem.id)}}
                            buttonColors={appConfig.theme.colors.neutrals[300]}
                            csize="lg"
                            variant="secondary"
                            styleSheet={{
                                borderRadius: '50%',
                                marginRight: '8px',
                                color: appConfig.theme.colors.neutrals[300],
                            }}
                            />
                    </Box>
                    {mensagem.texto}
                    </Text>
                )
            })}
        </Box>
    )
}
package main

import (
	"fmt"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	//configuração para conectar ao kafka
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "fc2-gokafka-kafka-1:9092",
		//identifica o consumer
		"client.id": "goapp-consumer",
		"group.id":  "goapp-group",
	}

	c, err := kafka.NewConsumer(configMap)

	if err != nil {
		fmt.Println(err.Error())
	}

	//inscrição do cosnumer em um topic
	topics := []string{"teste"}
	c.SubscribeTopics(topics, nil)

	//loop infinito para leitura de mensagens
	for {
		msg, err := c.ReadMessage(-1)
		if err == nil {
			fmt.Println(string(msg.Value), msg.TopicPartition)
		}
	}
}

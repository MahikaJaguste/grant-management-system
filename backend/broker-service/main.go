package main

import (
	"context"
	"log"
	"net"
	"net/http"

	pb "github.com/MahikaJaguste/grant-management-system/proto/grant"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
)

// BrokerService routes requests to appropriate microservices
type BrokerService struct {
	pb.UnimplementedGrantServiceServer
	GrantClient pb.GrantServiceClient
}

// Forward CreateGrant request to Grant Service
func (b *BrokerService) CreateGrant(ctx context.Context, req *pb.GrantRequest) (*pb.GrantResponse, error) {
	return b.GrantClient.CreateGrant(ctx, req)
}

func main() {
	// Connect to Grant Service
	conn, err := grpc.Dial("localhost:50052", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("Failed to connect to Grant Service: %v", err)
	}
	defer conn.Close()
	grantClient := pb.NewGrantServiceClient(conn)

	// Start gRPC Server
	listener, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}
	grpcServer := grpc.NewServer()
	broker := &BrokerService{GrantClient: grantClient}
	pb.RegisterGrantServiceServer(grpcServer, broker)

	go func() {
		log.Println("Broker Service running on port 50051...")
		if err := grpcServer.Serve(listener); err != nil {
			log.Fatalf("Failed to serve: %v", err)
		}
	}()

	// Start gRPC-Gateway (RESTful API)
	ctx := context.Background()
	mux := runtime.NewServeMux()
	err = pb.RegisterGrantServiceHandlerServer(ctx, mux, broker)
	if err != nil {
		log.Fatalf("Failed to register gRPC-Gateway: %v", err)
	}

	log.Println("Broker REST API running on port 8080...")
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatalf("Failed to serve HTTP API: %v", err)
	}
}

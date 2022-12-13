//
//  NetworkService.swift
//  mobile
//
//  Created by Иван Тазенков on 13.12.2022.
//

import Foundation
enum ApiType {
    case getProducts

    var baseURL: String {
        "http://localhost:8000"
    }

    var path: String {
        switch self {
        case .getProducts: return "/products/"
        }
    }

    var request: URLRequest {
        let url = URL(string: path, relativeTo: URL(string: baseURL)!)!
        var request = URLRequest(url: url)

        switch self {
        case .getProducts:
            request.httpMethod = "GET"
            return request
        }
    }
}

// MARK: - ApiManager

final class NetworkService {
    static let shared = NetworkService()

    func getProducts(completion: @escaping (Result<[Product], Error>) -> Void) {
        let request = ApiType.getProducts.request
        let task = URLSession.shared.dataTask(with: request) { data, _, error in
            if let error = error {
                completion(.failure(error))
            }
            guard let data = data else { return }
            do {
                let products = try JSONDecoder().decode([Product].self, from: data)
                DispatchQueue.main.async {
                    completion(.success(products))
                }
            } catch let jsonError {
                print("Failed decode error:", jsonError)
                completion(.failure(jsonError))
            }
        }
        task.resume()
    }
}
